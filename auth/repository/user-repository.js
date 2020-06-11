const userModel = require('../db/models/user-model.js');

async function createUser(params) {
	const user = new userModel.User(params);

	return await user.save();
}

async function getUser(id) {
	const user = userModel.User
						  .findById(id);
	return await user;
}

async function userExists(email) {
	const user = await userModel.User
						  .findOne()
						  .or([{email}]);
	return user;
}

module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.userExists = userExists;