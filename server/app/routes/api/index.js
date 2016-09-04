/**
 * Created by Nick on 23.08.2016.
 */

const Router = require('express').Router();

const user = require('./user');
const transaction = require('./transaction');

Router.use('/user', user);
Router.use('/transaction', transaction);

Router.use('/*', (req, res) => {
    res.status(500).send('Bad request');
});

module.exports = Router;