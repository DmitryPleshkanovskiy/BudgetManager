/**
 * Created by dmitry on 15.05.16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    email   : String,
    password: String,
    token   : String
});

//User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);