import { combineReducers } from 'redux';

import app from './appReducer';
import flashMessages from './flashMessages';
import auth from './authReducer';
import transactions from './transactionsListReducer'

import { routerReducer } from 'react-router-redux';

export default combineReducers({
  app,
  flashMessages,
  auth,
  transactions
});
