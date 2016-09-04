/**
 * Created by Nick on 01.06.2016.
 */

'use strict';

const router = require('express').Router();

const User = require('../../models/user');

router.get('/',  (req, res, next) => {
    res.status(200).send('get all users');
});

router.post('/',  (req, res, next) => {
    res.status(200).send('post new user');
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