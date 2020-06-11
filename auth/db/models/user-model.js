const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {hash} = require('../../utils/hash');
const {sendMail} = require('../../utils/mail');

const userSchema = mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		maxlength: 60,
		minlength: 3
	},
	lastname: {
		type: String,
		required: true,
		maxlength: 60,
		minlength: 3
	},
	email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        trim: true,
        lowercase: true,
        unique: true,
    },
    phone_number: {
        type: String,
        match: /^[0]+[0-9]{10}$/,
        trim: true,
        minlength: 5,
        maxlength: 20,
    },
    password: String,
    display_picture: {type: String, default: null},
    password_reset_token: {type: String, default: null},
    confirmation_token: {type: String, default: null},
    tokens: {
        type: Array,
        default: []
    },
    active: {type: Boolean, default: true},
    email_verified_at: {type: Date, default: null},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Method to generate token
userSchema.methods.generateAuthToken = function() {
	const token = this.signAuthToken();
	this.saveAuthToken(token);
	return token;
}

// generate auth token
userSchema.methods.signAuthToken = function() {
	const load = {
		_id: this._id,
		firstname: this.firstname,
		lastname: this.lastname,
		email: this.email
	}

	const token = jwt.sign(load, process.env.JWT_SECRET_TOKEN, {expiresIn: process.env.TOKEN_EXIPIRATION});
	return token;
}

userSchema.methods.saveAuthToken = function(token) {
	const userToken = this.tokens
	userToken.push(token);
	this.set({
		tokens: userToken
	});

	return this.save();
}

userSchema.methods.removeAuthToken = function(token) {
    var userToken = this.tokens
	userToken = userToken.filter((value) => {
		return token != value
	})

	this.set({
		token: userToken
	});

	return this.save();
}

userSchema.methods.generateVerificationCode = function(generateAuthToken = false) {
    const verificationCode = '' + Math.floor(100000 + Math.random() * 900000);
    const payload = {
        _id: this._id,
        email: this.email,
        code: verificationCode
    }
    const confirmationToken = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {expiresIn: process.env.TOKEN_EXIPIRATION});
	
    const message = `
        Dear ${this.firstname},<br><br>

        Thank you for registering on our platform. Use this code to complete your registration <b>${verificationCode}</b>.
    `;
    sendMail(this.email, 'Verify Your Email', message);
    if (generateAuthToken) {
        const authToken = this.signAuthToken();
        this.saveAuthTokenAndConfirmationCode(authToken, confirmationToken);
        return authToken;
    } else {
        this.saveConfirmationCode(confirmationToken);
        return confirmationToken
    }
}

userSchema.methods.resetPassword = function(generateAuthToken = false) {
    const newPassword = '' + Math.floor(10000000 + Math.random() * 90000000);
    const hashedPassword = hash(newPassword);
    const message = `
        Dear ${this.firstname},<br><br>

        Your new password is <b>${newPassword}</b>. <br><br>

        Kindly change your password when you login. 
    `;
    sendMail(this.email, 'Password Reset', message);
    this.password = hashedPassword;
    this.save();
}

userSchema.methods.saveConfirmationCode = function(confirmationToken) {
    this.set({
        confirmation_token: confirmationToken 
    });
    return this.save();
}

userSchema.methods.saveAuthTokenAndConfirmationCode = function(authToken, confirmationToken) {
    const userTokens = this.tokens;
    userTokens.push(authToken);
    this.set({
        tokens: userTokens,
        confirmation_token: confirmationToken 
    });
    return this.save();
}

const User = mongoose.model('User', userSchema);

module.exports.User = User;

