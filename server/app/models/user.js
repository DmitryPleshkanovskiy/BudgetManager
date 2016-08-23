/**
 * Created by dmitry on 15.05.16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    avatar  : String,
    name    : String,
    surname : String,
    login   : String,
    email   : String,
    password: String,
    token   : String
});

module.exports = mongoose.model('users', User);