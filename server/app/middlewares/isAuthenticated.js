const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../../config')

const isAuthenticated = function(req, res, next) {
    if (passport.authenticate('jwt', { session: false})) {
        var token = getToken(req.headers);
        if (token) {
            //var decoded = jwt.decode(token, config.auth.secret);
            jwt.verify(token, config.auth.secret, function(err, decoded) {
                if (err) {
                    return res.status(403).send({success: false, msg: 'Authentication failed. Broken token.'});
                } else {
                    User.findOne({
                    name: decoded.name
                    }, function(err, user) {
                        if (err) throw err;
                
                        if (!user) {
                            return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
                        } else {
                            next();
                            //res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
                        }
                    });
                }
            });
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'});
        }
    }
};

let getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = isAuthenticated;