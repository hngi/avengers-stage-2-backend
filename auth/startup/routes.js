const user = require('../routes/user');
const auth = require('../routes/auth');
const error = require('../routes/middleware/error');
const redirect = require('../routes/middleware/redirect');

module.exports = function(app) {
    app.use(redirect)
    //routes
    app.use('/api/v1/user', user);
    app.use('/api/v1/auth', auth);

    app.use(error);
}

