/**
 * Created by dmitry on 21.05.16.
 */

var express      = require('express');

var port         = process.env.PORT || 3000;
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var jwt          = require('jsonwebtoken');
var mongoose     = require('mongoose');

var app = express();

//var passport     = require('passport');
//var localStrategy = require('passport-local' ).Strategy;
//var flash        = require('connect-flash');


//var cookieParser = require('cookie-parser');

//var session      = require('express-session');

var path         = require('path');

var User = require('./app/models/user.js');
var configDB     = require('./config/database.js');

mongoose.connect(configDB.url);

// require('./config/passport')(passport);



var routes = require('./app/routes/api.js');

app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

//app.use(cookieParser());
// app.use(bodyParser());

// app.set('view engine', 'ejs');

// app.use(session({
//     secret: 'bluelephantflyinghy123',
//     resave: false,
//     saveUninitialized: false
// }));
//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());

// require('./app/routes.js')(app, passport);
//require

//passport.use(new localStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

app.use('/user/', routes);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use(express.static('client'));
app.use(express.static('server_v2.0/views/assets'));

app.get('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../client', '/index.html'));
});

// error hndlers
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

//app.listen(port);
//console.log('The magic happens on port ' + port);


module.exports = app;