
const {errorResponseMsg} = require('../../utils/response');
const {errorResponseMessages} = require('../../utils/response-messages');

module.exports = function(err, req, res, next) {
    console.log(err);
    errorResponseMsg(res, 500, errorResponseMessages.internalServerError);
}