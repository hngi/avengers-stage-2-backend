from flask import Blueprint, jsonify, request, make_response
from src.app import db
from flask import current_app
from functools import wraps
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from src.app.models.user import User
from src.app.blueprints.auth.emails import send_confirmation_email, send_password_reset_email 
import datetime
from itsdangerous import URLSafeTimedSerializer


auth_bp = Blueprint('auth',__name__)
 

# A decorator function for token on protected routes
def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']

        if not token:
            return jsonify({'message': 'A valid token is missing'}), 401

        try:
            data = jwt.decode(token, current_app.config[SECRET_KEY])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message': 'token is invalid'}), 401

        return f(current_user, *args, **kwargs)
    return decorator


#the register endpoint
@auth_bp.route("/register", methods=["POST"])
def sign_up():
    
        data = request.get_json()
        hashed_password = generate_password_hash(data['password_hash'], method='sha256')
        result = User.query.filter_by(email=data["email"]).first()
        if result:
            #check if email alredy in the database
            if result.email == data["email"]:
                
                    return jsonify({"message":"User already exist"}), 202

        new_user = User(public_id=str(uuid.uuid4()), email=data['email'],password_hash=hashed_password, email_confirmation_sent_on=datetime.datetime.utcnow())
        db.session.add(new_user)
        db.session.commit()
        #return jsonify({"message": "successfully registered"}), 201

        send_confirmation_email(new_user.email)
        return jsonify({"message": "Thanks for registering. Please check your email to confirm your email address"}), 201

@auth_bp.route('/login', methods=['POST'])
def login_user():

  auth = request.authorization

  if not auth or not auth.username or not auth.password:
     return make_response('Could not verify', 401, {'WWW.Authenticate': 'Basic realm: "login required"'})

  user = User.query.filter_by(email=auth.username).first()

  if not user:
      return make_response('Could not verify', 401, {'WWW.Authenticate': 'Basic realm: "login required"'})

  if check_password_hash(user.password_hash, auth.password):
     token = jwt.encode({'public_id': user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, current_app.config['SECRET_KEY'])
     return jsonify({'token' : token.decode('UTF-8')}), 200

  return make_response('Could not verify',  401, {'WWW.Authentication': 'Basic realm: "login required"'})

#processing the token for email confirmation
@auth_bp.route('/confirm/<token>')
def confirm_email(token):
    try:
        confirm_serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
        email = confirm_serializer.loads(token, salt='email-confirmation-salt', max_age=3600)
    except:
        return jsonify({"message":"The confirmation link is invalid or has expired."}), 401
    
 
    user = User.query.filter_by(email=email).first()
 
    if user.email_confirmed:
        return jsonify({"message":"Account already confirmed. Please login."}), 401
    else:
        user.email_confirmed = True
        user.email_confirmed_on = datetime.datetime.utcnow()
        db.session.add(user)
        db.session.commit()
        return jsonify({"message":"Account confirmed! Please login."}), 201


#route to use the helper func reset password
@auth_bp.route('/forgot_password', methods=["POST"])
def reset():
    data = request.get_json()
    try:
        user = User.query.filter_by(email=data["email"]).first_or_404()
    except:
        return jsonify({"message":"Invalid email address!"})
         
    if user.email_confirmed:
        send_password_reset_email(user.email)
        return jsonify({'message':'Please check your email for a password reset link.'})
    else:
        return jsonify({'message':'Your email address must be confirmed before attempting a password reset.'})

#route for handling the password reset link
@auth_bp.route('/forgot_password/<token>', methods=["GET","PUT"])
def reset_with_token(token):
    try:
        password_reset_serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
        email = password_reset_serializer.loads(token, salt='password-reset-salt', max_age=3600)
    except:
        return jsonify({'message':'The password reset link is invalid or has expired.'})
    
    data = request.get_json()
    try:
        hashed_password = generate_password_hash(data["password"], method="sha256")
        user = User.query.filter_by(email=email).first_or_404()
        user.password = hashed_password
        db.session.commit()
        return jsonify({'message':'Your password has been updated!' })
            
    except:
        return jsonify({'message':'Invalid email address!'})
    
 

