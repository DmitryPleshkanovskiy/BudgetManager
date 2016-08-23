/**
 * Created by Nick on 01.06.2016.
 */

'use strict';

var passport    = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt  = require('passport-jwt').ExtractJwt;

var User = require('../../models/user.js');

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'hn67dsg849092345';

module.exports = function (passport) {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
                // or you could create a new account 
            }
        });
    }));
};