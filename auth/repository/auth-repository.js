const userModel = require('../db/models/user-model');

async function findByEmail(email) {
	const user = await userModel.User
								.findOne({email: email});
	return user;
}

async function findToken(_id, token) {
	const user = await userModel.User
								.findById(_id);
	if(!user) return false;
	
	const userTokens = user.tokens;
	return userTokens.includes(token) ? user : false;
}


module.exports.findByEmail = findByEmail;
module.exports.findToken = findToken;