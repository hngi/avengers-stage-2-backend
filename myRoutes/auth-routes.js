// contain all authentication routes// 
const router = require('express').Router();
//requiring passport to use for auth
const passport  = require('passport');
router.get('/google', passport.authenticate(
    'google',
     {
    scope:['profile']
}
));//authenticationg with google strategy/and requesting for profile

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
res.send('done');
});
module.exports=router;