const _ = require('lodash')

function authView(data) {
    return _.pick(data, [
        '_id', 'merchant', 'fullname', 'email', 'phone_number', 'created_at', 'updated_at', 'active'
    ]);
}

function userView(data) {
    function userView(data) {
        let user = _.pick(data, [
            '_id', 'firstname', 'lastname', 'email', 'phone_number', 'created_at', 'updated_at', 'active'
        ]);
        return user;
    }
}

module.exports.authView = authView;
module.exports.userView = userView;

