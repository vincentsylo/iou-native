import { USER_LOGGED_IN } from '../actions/user';

const initialState = {
  isAuthenticated: false,
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
          ...state,
          isAuthenticated: action.isAuthenticated,
      };
    default:
      return state;
  }
}