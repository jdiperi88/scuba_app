const authController = require('../controllers/auth_controller');
const express = require('express');
const authRoutes = express.Router();
const passportService = require('../services/passport');
const passport = require('passport');

//gets jwt strategy
const requireAuth = passport.authenticate('jwt', {session: false})
console.log(requireAuth);
//gets local strategy helper method
const requireSignin = passport.authenticate('local', {session: false})

// authRoutes.get('/',requireAuth,(req, res)=>{
//     res.send({message: 'Super secret code 123'})
// })
    authRoutes.post('/signup',authController.signup)
    authRoutes.post('/signin',requireSignin,authController.signin)



module.exports = authRoutes;
