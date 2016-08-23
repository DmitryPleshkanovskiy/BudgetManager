/**
 * Created by dmitry on 22.05.16.
 */

var express = require('express');
var router  = express.Router();
var jwt     = require('jsonwebtoken');
//var passport = require('passport');

var User = require('../models/user.js');

router.post('/authenticate', function(req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });
});

router.post('/signup', function (req, res) {
    console.log("signup!");
    User.findOne({
        email: req.body.email,
        password: req.body.passowrd
    }, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error ocured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
                userModel.password = req.body.password;
                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, process.env.JWT_SECRET);
                    user.save(function(err, user1) {
                       res.json({
                           type: true,
                           data: user1,
                           token: user1.token
                       });
                    });
                });
            }
        }
    })
});

router.get('/me', ensureAuthorized, function (req, res) {
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});

function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorized"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;