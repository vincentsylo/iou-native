import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { Provider } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import Launch from './Launch';
import Login from './Login';
import Profile from './Profile';
import Tabs from './Tabs';
import store from '../store/configureStore';

export default class App extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.root}>
          <StatusBar
            backgroundColor="transparent"
            translucent
            barStyle="light-content"
          />
          <Router>
            <Scene key="root" hideNavBar>
              <Scene key="launch" component={Launch} initial />
              <Scene key="login" component={Login} />
              <Scene key="tabs" component={Tabs} />
              <Scene key="profile" component={Profile} schema="modal" direction="vertical" />
            </Scene>
          </Router>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});