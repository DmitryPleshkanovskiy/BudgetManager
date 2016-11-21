var webpack = require('webpack')
var webpackMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var historyApiFallback = require('connect-history-api-fallback');
var path         = require('path');

var express      = require('express');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var passport     = require('passport');

var app = express();

const isDeveloping = process.env.NODE_ENV !== 'production';

var config = require('../webpack.config');
var db     = require('./config').db;

mongoose.connect(db.url);

var api = require('./app/routes/api');

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