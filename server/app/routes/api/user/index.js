import express from 'express';

let router = express.Router();

import User from '../../../models/user';
import jwt from 'jwt-simple';
import config from '../../../../config';

import isAuthenticated from '../../../middlewares/isAuthenticated';

import validation from './validation';

router.get('/',  (req, res, next) => {
    res.status(200).send('get all users');
});

router.post('/',  (req, res, next) => {
    console.log(req.body);

    const { errors, isValid } = validation.validateSignupInput(req.body);

    if (isValid) {
        if (!req.body.email || !req.body.password) {
            res.status(401).json({errors: {form: 'Please pass email and password.'}});
        } else {
            var newUser = new User({
                email: req.body.email,
                password: req.body.password
            });

            newUser.save(function(err) {
                if (err) {
                    return res.status(401).json({errors: {email: 'This user already exists.'}});
                }
                res.status(200).json({success: true, msg: 'Successfully created new user.'});
            })
        }
        
    }
    else {
        res.status(400).json({errors: errors});
    }

    
});

router.post('/authenticate', function(req, res) {
    const { email, password } = req.body;
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) { throw err; }
        if (!user) {
            res.status(401).json({ errors: { form: 'Authentication failed. Invalid credentials.'}});
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    const token = jwt.encode(
                        {
                            _id: user._id,
                            email: user.email 
                        }, config.auth.secret
                    );
                    res.status(200).json({ token:  token }); //'JWT ' +
                } else {
                    res.status(401).json({ errors: {form: 'Authentication failed. Invalid credentials.'}});
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