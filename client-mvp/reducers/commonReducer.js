import { combineReducers } from 'redux';

import app from './appReducer';
import flashMessages from './flashMessages';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
  app,
  flashMessages
  //routing: routerReducer
});
