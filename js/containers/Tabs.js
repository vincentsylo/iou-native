import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';
import FCM from 'react-native-fcm';
import Drawer from 'react-native-drawer';
import DrawerContent from '../components/DrawerContent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../components/TabBar';
import Header from '../components/Header';
import People from './People';
import Redeem from './Redeem';
import Owe from './Owe';

export default class Tabs extends Component {
  componentDidMount() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      console.log(token)
      // store fcm token in your server
    });
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    });
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      console.log(token)
      // fcm token may not be available on first load, catch it here
    });
  }

  componentWillUnmount() {
    // prevent leaking
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }
  
  openDrawer() {
    this._drawer.open();
  }

  closeDrawer() {
    this._drawer.close();
  }

  render() {
    return (
      <View style={styles.root}>
        <Drawer
          tapToClose
          side="right"
          content={<DrawerContent close={::this.closeDrawer} />}
          ref={c => this._drawer = c}
        >
          <Header rightAction={::this.openDrawer} />
          <ScrollableTabView
            initialPage={1}
            tabBarPosition="top"
            renderTabBar={() => <TabBar />}
          >
            <View tabLabel={{ icon: 'book', title: 'Owe' }} style={styles.tabView}>
              <Owe />
            </View>
            <View tabLabel={{ icon: 'users', title: 'People' }} style={styles.tabView}>
              <People />
            </View>
            <View tabLabel={{ icon: 'gift', title: 'Redeem' }} style={styles.tabView}>
              <Redeem />
            </View>
          </ScrollableTabView>
        </Drawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabView: {
    flex: 1,
  },
});
