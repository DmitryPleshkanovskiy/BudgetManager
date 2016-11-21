const Router = require('express').Router();

const user = require('./user');
const account = require('./account');
const transaction = require('./transaction');


Router.use('/user', user);
Router.use('/account', account);
Router.use('/transaction', transaction);

// Router.use('/*', (req, res) => {
//     res.status(500).send('Bad request');
// });

module.exports = Router;