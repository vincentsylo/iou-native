import { Actions, Scene, Router } from 'react-native-router-flux';
import Launch from './Launch';
import Login from './Login';
import People from './People';
import Owe from './Owe';
import Redeem from './Redeem';

export default Actions.create(
  <Router>
    <Scene key="root">
      <Scene key="launch" component={Launch} initial />
      <Scene key="login" component={Login} />
      <Scene key="home" tabs>
        <Scene key="people" component={People} />
        <Scene key="owe" component={Owe} />
        <Scene key="redeem" component={Redeem} />
      </Scene>
    </Scene>
  </Router>
);