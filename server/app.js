import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev.js';
var historyApiFallback = require('connect-history-api-fallback');
import path from 'path';

import express      from 'express';

import morgan       from 'morgan';
import bodyParser   from 'body-parser';
import mongoose     from 'mongoose';
import passport     from 'passport';

let app = express();

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

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler))

// if (isDeveloping) {
//     const compiler = webpack(config);
//     const middleware = webpackMiddleware(compiler, {
//         publicPath: config.output.publicPath,
//         contentBase: 'src',
//         stats: {
//             colors: true,
//             hash: false,
//             timings: true,
//             chunks: false,
//             chunkModules: false,
//             modules: false
//         }
//     });

//     app.use(historyApiFallback({
//         verbose: false
//     }));

//     app.use(middleware)
//     app.use(webpackHotMiddleware(compiler))

    

//     app.get('/*', function (req, res) {
//         res.sendFile(path.join(__dirname, 'dist/index.html'));
//         res.end();
//     });

// } else {
//     app.use(express.static(__dirname + '/dist'));
//     app.get('*', function (req, res, next) {
//         res.sendFile(path.join(__dirname, 'dist/index.html'));
//     });
// }

app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client-mvp/index.html'));
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