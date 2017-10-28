const passport = require('passport');
const UserModel = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy 
const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy({usernameField: 'email'}, function(email,password,done){
    // verify this username and password
    UserModel.findOne({ email: email }, function(err, user){
        if(err) { return done(err); }
        if(!user){return done(null,false)}

        //compare passwwords is password == password?
        user.comparePassword(password, function(err, isMatch){
            if(err) {return done(err)}
            if(!isMatch) {return done(null, false);}
            return done(null,user);
        })
    })
})
//setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//create jwt strategy 
//payload is the decoded jwt token
//done is a callback function that sees if the user ID exists in our database 
//otherwise call done without a user object
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload.sub, function(err, user){
        if (err) {return done(err,false);}

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);