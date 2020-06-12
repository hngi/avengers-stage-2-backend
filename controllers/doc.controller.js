const swaggerDocument = require('../docs/frontend-swagger.json');
exports.documentations = (req, res, next) => {
    res.status(200).send({ success: true, documentation: swaggerDocument })
}