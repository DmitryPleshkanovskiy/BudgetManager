import { combineReducers } from 'redux';

import app from './appReducer';
import flashMessages from './flashMessages';
import auth from './authReducer';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
  app,
  flashMessages,
  auth
  //routing: routerReducer
});
