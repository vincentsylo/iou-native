import { USER_LOG_IN, USER_LOG_OUT } from '../actions/user';

const initialState = {
  token: null,
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOG_IN:
      return {
          ...state,
          token: action.token,
      };
    case USER_LOG_OUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}