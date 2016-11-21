/**
 * Created by dmitry on 21.05.16.
 */


var webpack = require('webpack')
var webpackMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var historyApiFallback = require('connect-history-api-fallback');
var config = require('../webpack.config')

var express      = require('express');

// var port         = process.env.PORT || 3000;
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
// var jwt          = require('jsonwebtoken');
var mongoose     = require('mongoose');

var app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';


var passport     = require('passport');

var path         = require('path');

//var User = require('./app/models/user.js');
var db     = require('./config').db;

mongoose.connect(db.url);

// require('./config/passport')(passport);

var api = require('./app/routes/api');
//var routes = require('./app/routes/routes');

//app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(passport.initialize());

require('./config/passport')(passport);

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
//     next();
// });

app.use('/api/', api);

// app.get('/angular', function(req, res) {
//     res.sendFile(path.join(__dirname, '../client', 'index.html'));
// });

//app.use(express.static(__dirname + '../client'));

//app.use('/', routes)


if (isDeveloping) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(historyApiFallback({
        verbose: false
    }));

    app.use(middleware)
    app.use(webpackHotMiddleware(compiler))

    

    app.get('*', function (req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        res.end();
    }).bind(this);

} else {
    app.use(express.static(__dirname + '/dist'));
    app.get('*', function (req, res, next) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}





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