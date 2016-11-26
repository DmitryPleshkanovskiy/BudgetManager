import express from 'express';

let Router = express.Router();

import usersApi from './user/index';
import accountsApi from'./account';
import transactionsApi from './transaction';

Router.use('/users', usersApi);
Router.use('/accounts', accountsApi);
Router.use('/transactions', transactionsApi);

module.exports = Router;