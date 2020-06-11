const {validateCreateUser, validateChangePassword} = require('../utils/validators/user-validator');
const {successResponseMsg, errorResponseMsg, sessionSuccessResponseMsg} = require('../utils/response');
const {userResponseMessages, authResponseMessages} = require('../utils/response-messages');
const {userExists, getUser, createUser} = require('../repository/user-repository');
const {userView} = require('../utils/view');
const {hash} = require('../utils/hash');
const jwt = require('jsonwebtoken');

async function create(req, res) {
    validateCreateUser(req.body).then((succ) => {
        const user = req.body;
        //check if user exist
        userExists(user.email).then((value) => {
            if(value) return errorResponseMsg(res, 200, userResponseMessages.userExists);
            // user does not exist
            user.password = hash(user['password']);
            createUser(user).then((data) => {
                const token = data.generateVerificationCode(true);
                sessionSuccessResponseMsg(res, userResponseMessages.userCreated, token, userView(data));
            }, (err) => {
                const errorMsg = err.errors ? err.errors[Object.keys(err.errors)[0]]['message'] : err.message;
                errorResponseMsg(res, 200, errorMsg);
            }).catch((err) => {
                const errorMsg = err.errors ? err.errors : err.message;
                errorResponseMsg(res, 200, errorMsg);
            })
        }, (err) => {
            const errorMsg = err.errors ? err.errors : err.message;
            errorResponseMsg(res, 200, errorMsg);
        })
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    })
}

async function verifyEmail(req, res) {
    const user = req.user;
    try {
        const decoded = jwt.verify(user.confirmation_token, process.env.JWT_SECRECT_TOKEN);
        if (decoded.code === req.body.verification_code) {
            const date = new Date().toJSON();
            user.set({email_verified_at: date, confirmation_token: null});
            user.save();
            successResponseMsg(res, authResponseMessages.emailVerified, userView(user));
        }
        else {
            throw new Error(authResponseMessages.invalidVerificationCode)
        }
    } catch (error) {
    }
}

async function resendVerificationCode(req, res) {
    const userId = req.user._id;
    getUser(userId).then((data) => {
        data.generateVerificationCode();
        successResponseMsg(res, userResponseMessages.verificationCodeSent);
    }, (err) => {
        errorResponseMsg(res, 200, err.message);
    });
}

async function updatePassword(req, res) {
    const user = req.user;
    validateChangePassword(req.body).then((succ) => {
        user.password = hash(req.body.password);
        user.save();
        successResponseMsg(res, userResponseMessages.passwordUpdated);
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    });
}



module.exports.create = create;
module.exports.verifyEmail = verifyEmail;
module.exports.resendVerificationCode = resendVerificationCode;
module.exports.updatePassword = updatePassword;


