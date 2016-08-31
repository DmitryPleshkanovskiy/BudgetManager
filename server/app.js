/**
 * Created by dmitry on 21.05.16.
 */

var express      = require('express');

// var port         = process.env.PORT || 3000;
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
// var jwt          = require('jsonwebtoken');
var mongoose     = require('mongoose');

var app = express();

var passport     = require('passport');
//var localStrategy = require('passport-local' ).Strategy;
//var flash        = require('connect-flash');


//var cookieParser = require('cookie-parser');

//var session      = require('express-session');

var path         = require('path');

var User = require('./app/models/user.js');
var db     = require('./config').db;

mongoose.connect(db.url);

// require('./config/passport')(passport);



var api = require('./app/routes/api');

app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

app.use('/api/', api);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use(express.static(__dirname + '../client'));

app.get('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../client', '/index.html'));
});

// error handlers
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
        message: err.message,
        error: {}
    }));
});

module.exports = app;