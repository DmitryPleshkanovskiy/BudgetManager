/**
 * Created by dmitry on 15.05.16.
 */
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
// const User = require('../app/models/User');
var config = require('../config');

module.exports = function(passport) {
    var options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeader();
    options.secretOrKey = config.auth.secret;

    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};