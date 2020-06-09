const router = require('express').Router()

const { registerUser, loginUser } = require('../controllers/user.controller')

router.post('/register', registerUser)
router.post('/login', loginUser)

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = router
