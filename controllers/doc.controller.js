const swaggerDocument = require('../docs/frontend-swagger.json');
const httpStatus = require('http-status-codes');
exports.documentations = (req, res, next) => {
    res.status(httpStatus.OK).send({ success: true, documentation: swaggerDocument })
}