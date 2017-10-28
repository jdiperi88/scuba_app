const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// Define our model
const userSchema = new Schema({
    firstname: String,
    lastname: String,
    // validations wrapped in object
    username: { type: String, unqiue: true, lowercase: true },
    email: { type: String, unqiue: true, lowercase: true },
    password: String,
});

// on save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function(next){
    const user = this;

    // generate the salt 
    bcrypt.genSalt(10, function(err,salt) {
        if(err) { return next(err); }
    
        //hash the salted password
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) { return next(err); }
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) { return callback(err); }

        callback(null, isMatch);
    })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model

module.exports = ModelClass;