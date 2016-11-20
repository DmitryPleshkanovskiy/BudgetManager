var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    name        : String,
    value       : Number,
    description : String,
    user        : String
});

module.exports = mongoose.model('accounts', Account);