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
                    return res.status(403).send({errors: 'Authentication failed. Broken token.'});
                } else {
                    User.findOne({
                    email: decoded.email
                    }, function(err, user) {
                        if (err) throw err;
                
                        if (!user) {
                            return res.status(403).send({errors: 'Authentication failed. User not found.'});
                        } else {
                            req.currentUser = {
                                _id: user.id,
                                email: user.email
                            }
                            next();
                        }
                    });
                }
            });
        } else {
            return res.status(403).send({errors: 'No token provided.'});
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

export default isAuthenticated;