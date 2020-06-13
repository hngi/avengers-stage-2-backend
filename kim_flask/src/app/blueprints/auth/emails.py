from flask import jsonify, request, url_for
from flask_mail import Message
from src.app import mail
from itsdangerous import URLSafeTimedSerializer
from flask import current_app

#helper func for sending email
def send_email(subject, sender, recipients, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    #msg.body = text_body
    msg.html = html_body
    mail.send(msg)

#helper func for confirming email
def send_confirmation_email(user_email):
    confirm_serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
 
    confirm_url = url_for(
        'auth.confirm_email',
        token=confirm_serializer.dumps(user_email, salt='email-confirmation-salt'),
        _external=True)

    send_email('Confirm Your Email Address', sender=current_app.config['ADMIN'][0], recipients=[user_email], html_body=confirm_url)

 
 #helper func to reset password
def send_password_reset_email(user_email):
    password_reset_serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
 
    password_reset_url = url_for(
        'auth.reset_with_token',
        token = password_reset_serializer.dumps(user_email, salt='password-reset-salt'),
        _external=True)
 
    send_email('Password reset', sender=current_app.config['ADMIN'][0], recipients=[user_email], html_body=password_reset_url)

 
