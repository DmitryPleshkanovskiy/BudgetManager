var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
    date        : String,
    value       : Number,
    type        : String,
    description : String,
    category    : String,
    user        : String
});

module.exports = mongoose.model('transactions', Transaction);