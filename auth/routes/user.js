const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();
const auth = require('./middleware/auth');
const authUnverified = require('./middleware/auth-unverified');

router.post('/register', jsonParser, (req, res) => {
    userController.create(req, res);
})

router.get('/confirmation/resend', jsonParser, authUnverified, (req, res) => {
    userController.resendVerificationCode(req, res);   
});

router.post('/email/verify', jsonParser, authUnverified, (req, res) => {
    userController.verifyEmail(req, res);   
});

router.put('/password', auth, jsonParser, (req, res) => {
    userController.updatePassword(req, res);    
});

module.exports = router;