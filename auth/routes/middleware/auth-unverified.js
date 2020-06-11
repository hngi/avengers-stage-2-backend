const jwt = require('jsonwebtoken');
const {errorResponseMsg} = require('../../utils/response');
const {authResponseMessages} = require('../../utils/response-messages');
const {findToken} = require('../../repository/auth-repository');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) 
        return errorResponseMsg(res, 401, authResponseMessages.authorisationFailed);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        findToken(decoded._id, token).then((user) => {
            if (!user)
                return errorResponseMsg(res, 403, authResponseMessages.invalidAuthorisationToken);
            if (user.email_verified_at)
                return errorResponseMsg(res, 403, authResponseMessages.accessDenied);
            req.user = user;
            req.token = token;
            next();
        }).catch((err) => {
            errorResponseMsg(res, 401, authResponseMessages.invalidAuthorisationToken);
        })
    } catch (error) {
        errorResponseMsg(res, 401, authResponseMessages.invalidAuthorisationToken);
    }
    
}
