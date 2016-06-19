/**
 * Created by dmitry on 02.04.16.
 */

var assert = require('assert');

module.exports = function (app, db) {
    
    app.get('/api/v1/transactions/:page', function (req, res) {
        var rescount = 200;
        var cursor = db.collection('items').find({});
        cursor.sort({"date": -1});
        // cursor.skip(req.params.page * rescount);
        // cursor.limit(rescount);
        cursor.toArray(function(err, docs) {
            assert.equal(err, null);
            //console.log(docs.length);
            res.json(docs);
        });
    });

    app.post('/api/v1/transactions/add', function (req, res) {
        console.log(req.body);
        var data = req.body;
        db.collection('items').insertOne({
            "date": data.date,
            "sum": data.sum,
            "description": data.description
        }, function (err, doc) {
            assert.equal(null, err);
            res.status(200);
        });

        //console.log("add");
        //TODO post new transaction
    });
    
    
};