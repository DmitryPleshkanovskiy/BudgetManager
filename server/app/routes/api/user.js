/**
 * Created by Nick on 01.06.2016.
 */

'use strict';

const router = require('express').Router();

const User = require('../../models/user');

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

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    res.send('get user with id: ' + id);
});

router.put('/:id', (req, res, next) => {
    var id = req.params.id;
    res.send('put user with id: ' + id);
});


module.exports = router;