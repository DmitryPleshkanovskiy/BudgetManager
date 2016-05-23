/**
 * Created by dmitry on 13.03.16.
 */

'use strict';

var express = require('express');
var mongoClient = require('mongodb').MongoClient;
var engines = require('consolidate');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var assert = require('assert');

var app = express();

app.engine('html', engines.nunjucks);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoClient.connect('mongodb://localhost:27017/budman', function (err, db) {

    require('./api/api.js')(app, db);

    app.get('/nun', function (req, res) {
        db.collection('items').find({}).sort({date: 1}).toArray(function (err, docs) {
            res.render('index', {items: docs});
        });
    });

    app.get('/newitem', function (req, res, next) {
        res.render('newitem', {});
    });

    app.post('/newitem', function (req, res, next) {
        var date = req.body.date;
        var sum = req.body.sum;
        var description = req.body.description;
        
        //TODO add data validation
        
        db.collection('items').insertOne(
            {'date': date, 'sum': sum, 'description': description},
            function (err, r) {
                assert.equal(null, err);
                res.redirect('/');
        });
    });

    app.get('/update/:id', function (req, res, next) {
        var id = req.params.id;
        //console.log(id);
        //var id = 'Hello!';
        res.status(200).send(id);
    });

    app.get('/nun/*', function (req, res, next) {
        res.redirect('/nun');
    });


    app.use(express.static('client/bower_components'));

    app.use(express.static('client'));

    app.get('/*', function (req, res, next) {
        res.sendFile(path.join(__dirname, '../client', '/index.html'));
    });
});




//app.use(express.static('client'));

/*app.get('/!*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../client', '/index.html'));
});*/


app.listen(3000, function () {
   console.log("App is running on port 3000");
});