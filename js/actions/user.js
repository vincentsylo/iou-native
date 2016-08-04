import { AccessToken } from 'react-native-fbsdk';
import api from '../utils/api';

export const USER_LOG_IN = 'USER_LOGGED_IN';
export const USER_LOG_OUT = 'USER_LOG_OUT';
export const USER_SET_DEVICE_TOKEN = 'USER_SET_DEVICE_TOKEN';

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

export function userSetDeviceToken(deviceToken) {
  return (dispatch, getState) => {
    api(getState().user).post('/user/deviceToken', {
      deviceToken,
    }).then((json) => {
      dispatch(userSetDeviceTokenComplete(json.data));
    });
  }
}

function userSetDeviceTokenComplete(user) {
  return {
    type: USER_SET_DEVICE_TOKEN,
    deviceToken: user.deviceToken,
  };
}