import { AccessToken } from 'react-native-fbsdk';

export const USER_LOG_IN = 'USER_LOGGED_IN';
export const USER_LOG_OUT = 'USER_LOG_OUT';

export function userLogin() {
  return dispatch => {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        dispatch(userLoggedIn(data));
      }
    );
  }
}

export function userLogout() {
  return {
    type: USER_LOG_OUT,
  };
}

function userLoggedIn(token) {
  return {
    type: USER_LOG_IN,
    token,
  };
}