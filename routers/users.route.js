const router = require('express').Router()

const UserController = require('../controllers/user.controller')
const GoogleController = require('../controllers/google.controller')
const BusinessController = require('../controllers/business.controller')
const DocController = require('../controllers/doc.controller')

// router.get('/', )
router.get('/documentation', DocController.documentations);
router.post('/configure', BusinessController.configure)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/authenticate', UserController.checkToken, UserController.authenticate);
router.post('/reset-password', UserController.checkToken, UserController.resetPassword);
router.get('/google/signin', GoogleController.urlGoogle);
router.post('/forgot-password', UserController.reset)

// Strictly backend routes
router.get('/google/callback', GoogleController.getGoogleAccountFromCode);
router.post('/change-password/:token', UserController.changePassword)

module.exports = router
