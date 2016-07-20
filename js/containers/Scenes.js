import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import Launch from './Launch';
import Login from './Login';
import Tabs from './Tabs';

export default Actions.create(
<Scene key="root" hideNavBar>
  <Scene key="launch" component={Launch} initial title="Launch" />
  <Scene key="login" component={Login} title="Login" />
  <Scene key="tabs" component={Tabs} />
</Scene>
);