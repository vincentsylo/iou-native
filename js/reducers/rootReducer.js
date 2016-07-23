import { combineReducers } from 'redux';
import user from './user';
import people from './people';
import gift from './gift';

export default combineReducers({
  user,
  people,
  gift,
});