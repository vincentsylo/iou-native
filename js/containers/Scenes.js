import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import Launch from './Launch';
import Login from './Login';
import People from './People';
import Owe from './Owe';
import Redeem from './Redeem';

export default Actions.create(
<Scene key="root">
  <Scene key="launch" component={Launch} initial title="Launch" />
  <Scene key="login" component={Login} title="Login" />
  <Scene key="home" tabs>
    <Scene key="people" component={People} title="People" />
    <Scene key="owe" component={Owe} title="Owe" />
    <Scene key="redeem" component={Redeem} title="Redeem" />
  </Scene>
</Scene>
);