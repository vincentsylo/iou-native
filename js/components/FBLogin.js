import React, { Component, PropTypes } from 'react';
import {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { userLogin, userLogout } from '../actions/user';

@connect()
export default class FBLogin extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  render() {
    const { dispatch } = this.props;

    return (
      <LoginButton
        readPermissions={['public_profile', 'user_friends', 'email']}
        onLoginFinished={
          (error) => {
            if (error) {
              Actions.login({ type: 'replace' });
            } else {
              AccessToken.getCurrentAccessToken().then(
                () => {
                  dispatch(userLogin());
                  Actions.launch({ type: 'replace' });
                }
              )
            }
          }
        }
        onLogoutFinished={() => {
          dispatch(userLogout());
          Actions.launch({ type: 'replace' });
        }}
      />
    )
  }
}