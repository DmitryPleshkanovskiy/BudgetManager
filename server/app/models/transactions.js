/**
 * Created by Nick on 23.08.2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Transaction = new Schema({
    date        : String,
    value       : Number,
    description : String,
    category    : String,
    user        : String
});

module.exports = mongoose.model('transactions', Transaction);