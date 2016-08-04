import { USER_LOG_IN, USER_LOG_OUT, USER_SET_DEVICE_TOKEN } from '../actions/user';

const initialState = {
  token: null,
  deviceToken: null,
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
    case USER_SET_DEVICE_TOKEN:
      return {
        ...state,
        deviceToken: action.deviceToken,
      };
    default:
      return state;
  }
}