var mongoose = require('mongoose'),
    // bcrypt   = require('bcrypt-nodejs'),
    passportLocalMongoose = require('passport-local-mongoose');

// define the schema for our user model
var User = new mongoose.Schema({


        email        : String,
        password     : String,
    

});

// methods ======================
// generating a hash
// User.methods.generateHash = function(password) {
//    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// checking if password is valid
// User.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };
User.plugin(passportLocalMongoose);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', User);