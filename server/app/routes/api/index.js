/**
 * Created by Nick on 23.08.2016.
 */

const router = require('express').Router();

const user = require('./user');
const transaction = require('./transaction');


module.exports = function(app) {

    router.use('/user', user);
    router.use('/transaction', transaction);

    router.use('/*', (req, res) => {
        return res.badRequest();
    });

    return router;

};