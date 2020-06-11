const passwordHash = require('password-hash');

function hash(value) {
	const hashed = passwordHash.generate(value);
	return hashed;
}

function compare(value, hashed) {
	const result = passwordHash.verify(value, hashed);
	return result;
}

module.exports.hash = hash;
module.exports.compare = compare;