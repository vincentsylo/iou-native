import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';
import Drawer from 'react-native-drawer';
import DrawerContent from '../components/DrawerContent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../components/TabBar';
import Header from '../components/Header';
import People from './People';
import Redeem from './Redeem';
import Owe from './Owe';

export default class Tabs extends Component {
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
            tabBarPosition="bottom"
            renderTabBar={() => <TabBar />}
          >
            <View tabLabel="book" style={styles.tabView}>
              <Owe />
            </View>
            <View tabLabel="users" style={styles.tabView}>
              <People />
            </View>
            <View tabLabel="gift" style={styles.tabView}>
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
