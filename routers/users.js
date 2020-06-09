const router = require('express').Router()

const { registerUser, checkToken, resetPassword, loginUser } = require('../controllers/user.controller')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/reset-password', checkToken, resetPassword);

module.exports = router
