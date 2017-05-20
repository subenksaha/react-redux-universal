import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import demo from './demoReducer';
export default combineReducers({
  demo,
  routing: routerReducer
});
