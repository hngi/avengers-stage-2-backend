const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const auth = require('./middleware/auth');
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();

router.post('/login', jsonParser, (req, res) => {
    authController.createSession(req, res);   
});

router.delete('/logout', jsonParser, auth, (req, res) => {
    authController.deleteSession(req, res);   
});

router.post('/password/reset', jsonParser, (req, res) => {
    authController.passwordReset(req, res); 
});

module.exports = router;