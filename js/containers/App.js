import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-native-router-flux';
import scenes from './Scenes';
import store from '../store/configureStore';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router scenes={scenes} />
      </Provider>
    )
  }
}