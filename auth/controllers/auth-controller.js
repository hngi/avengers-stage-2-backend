const {validateCreateSession, validatePasswordReset, validateResetPassword} = require('../utils/validators/auth-validator');
const {successResponseMsg,  sessionSuccessResponseMsg, errorResponseMsg} = require('../utils/response');
const {authResponseMessages} = require('../utils/response-messages');
const {findByEmail} = require('../repository/auth-repository');
const {compare} = require('../utils/hash');
const {userView} = require('../utils/view');

async function createSession(req, res) {
    validateCreateSession(req.body).then((succ) => {
        const requestBody = req.body;
        findByEmail(requestBody.email).then((data) => {
            if (!data)
                return errorResponseMsg(res, 404, authResponseMessages.sessionCreateFailed);
            
            const result = compare(requestBody.password, data.password);
            if (result) {
                const token = data.generateAuthToken();
                sessionSuccessResponseMsg(res, authResponseMessages.sessionCreated, token, userView(data));
            } else {
                errorResponseMsg(res, 401, authResponseMessages.sessionCreateFailed);
            }
            
        }, (_err) => {
            errorResponseMsg(res, 404, authResponseMessages.sessionCreateFailed);
        }).catch((err) => {
            const errorMessage = err.errors ? err.errors : err.message;
            errorResponseMsg(res, 500, errorMessage);
        });
        
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    });
}
async function passwordReset(req, res) {
    validatePasswordReset(req.body).then((_succ) => {
        findByEmail(req.body.email).then((user) => {
            user.resetPassword();
            successResponseMsg(res, authResponseMessages.passwordReset);
        }).catch((err) => {
            errorResponseMsg(res, 400, err.message);
        });
        
    }, (err) => {
        errorResponseMsg(res, 400, err.message);
    }).catch((err) => {
        errorResponseMsg(res, 400, err.message);
    });
}

async function deleteSession(req, res) {
    findByEmail(req.user.email).then((data) => {
        const token = data.removeAuthToken(req.token);
        sessionSuccessResponseMsg(res, authResponseMessages.sessionDeleted, token, userView(data));
    }).catch((err) => {
        const errorMessage = err.errors ? err.errors : err.message;
        errorResponseMsg(res, 200, errorMessage);
    });
}

module.exports.createSession = createSession;
module.exports.passwordReset = passwordReset;
module.exports.deleteSession = deleteSession;