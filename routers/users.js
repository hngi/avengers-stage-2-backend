const router = require('express').Router()
//auth login
router.get('/login',(req,res)=>{
    res.send("normal login page");
});
const { registerUser, loginUser } = require('../controllers/user.controller');
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;
