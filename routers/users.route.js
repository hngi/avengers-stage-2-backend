const router = require('express').Router()

const UserController = require('../controllers/user.controller')
const GoogleController = require('../controllers/google.controller')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/google-sigin', GoogleController.urlGoogle);
router.post('/google-sigin', GoogleController.getGoogleAccountFromCode);

module.exports = router
