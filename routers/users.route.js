const router = require('express').Router()

const UserController = require('../controllers/user.controller')
const GoogleController = require('../controllers/google.controller')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/reset-password', UserController.checkToken, UserController.resetPassword);
router.get('/google-signin', GoogleController.urlGoogle);
router.post('/google/callback/:code', GoogleController.getGoogleAccountFromCode);

module.exports = router
