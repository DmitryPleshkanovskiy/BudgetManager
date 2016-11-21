const router = require('express').Router();

const User = require('../../models/user');
const jwt = require('jwt-simple');
const config = require('../../../config');

const isAuthenticated = require('../../middlewares/isAuthenticated');

router.get('/',  (req, res, next) => {
    res.status(200).send('get all users');
});

router.post('/signup',  (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass email and password.'});
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successfully created new user.'});
        })
    }
});

router.post('/authenticate', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) { throw err; }
        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    const token = jwt.encode(user, config.auth.secret);
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
})

router.get('/me', isAuthenticated, function(req, res) {
    res.send('me');
});

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    res.send('get user with id: ' + id);
});

router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    res.send('put user with id: ' + id);
});


module.exports = router;