const jwt = require("jwt-simple");
const config = require('../config')
const authController = {};
const UserModel = require('../models/user')

//function to make token with id and secret string
function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

authController.signin = (req, res, next) =>{
    //checking credentials in exchange for token
    res.send({ token: tokenForUser(req.user) })
}

authController.signup = function(req,res,next) {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname ;
    const  username = req.body.username;

    if( !email || !password ) {
        return res.status(422).send({error: 'you must provide all fields'})
    }

    // see if user exists with that email
    UserModel.findOne({ email: email },(err,existingUser)=> {
        if (err) { return next(err); }

     // dispatch an error message   
        if(existingUser) {
            return res.status(422).send({err:'Email is in use'});
        }

        /// Create New user
        const user = new UserModel({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
             username: username
        });
        // actually save it to database
        user.save((err)=>{
            if (err) {
                return next(err);
            }
            res.json({ token:tokenForUser(user) })
        });
    })

}

module.exports = authController;