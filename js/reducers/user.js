import { USER_SET } from '../actions/user';

const initialState = {
  isLoggedIn: false,
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_SET:
      return action.user;

    default:
      return state;
  }
}