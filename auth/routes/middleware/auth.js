const jwt = require('jsonwebtoken');
const {errorResponseMsg} = require('../../utils/response');
const {authResponseMessages} = require('../../utils/response-messages');
const {findToken} = require('../../repository/auth-repository');

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token');
	if(!token)
		return errorResponseMsg(res, 401, authResponseMessages.authorisationFailed);
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
		findToken(decoded._id, token).then((user) => {
			if(!user) {
				return errorResponseMsg(res, 401, authResponseMessages.invalidAuthorisationToken);
			}
			req.user = user;
			req.token = token;
			next();
		}).catch(err => {
			return errorResponseMsg(res, 401, authResponseMessages.invalidAuthorisationToken);
		})
	} catch (error) {
		return errorResponseMsg(res, 401, authResponseMessages.invalidAuthorisationToken);
	}
}