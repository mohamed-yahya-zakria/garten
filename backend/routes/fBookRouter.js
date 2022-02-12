
const express = require('express');
const router = express.Router();
const session = require('express-session')
const passport = require('passport')
const facebookStrategy= require('passport-facebook').Strategy

router.use(passport.initial());
router.use(passport.session());
// get clientId and secret under facebook developer website

router.use(session({secret:"mySecretKEY"}))
passport.use(new facebookStrategy({
    clientID : "",
    clientSecret : "",
    callbackURL :" http://localhost:5000/user/facebook/callback",
    profileFields : ['id','displayName', 'name',]
},
function(token, refreshToken, Profile, done){
   return done(null,Profile)
}
))
app.get('/signin/passport/facebook', passport.authenticate('facebook'));
app.get('/signin/passport/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000'
}),(req, res)=>{
    res.redirect('http://localhost:3000/profile/'+req.user._id)
})

router.get('/signin/passport/facebook', passport.authenticate('facebook'),{scope: 'email'})

module.exports = router;