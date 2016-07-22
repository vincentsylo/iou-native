import { combineReducers } from 'redux';
import user from './user';
import people from './people';

export default combineReducers({
  user,
  people,
});