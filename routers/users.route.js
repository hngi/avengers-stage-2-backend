const router = require('express').Router()

const UserController = require('../controllers/user.controller')
const GoogleController = require('../controllers/google.controller')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/reset-password', UserController.checkToken, UserController.resetPassword);
router.get('/google-sigin', GoogleController.urlGoogle);
router.post('/google-sigin', GoogleController.getGoogleAccountFromCode);
router.post('/reset', UserController.reset)
router.post('/change-password/:token', UserController.changePassword)

module.exports = router
