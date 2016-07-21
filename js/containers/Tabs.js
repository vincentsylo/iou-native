import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../components/TabBar';
import Header from '../components/Header';
import People from './People';
import Redeem from './Redeem';
import Owe from './Owe';

export default class Tabs extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Header />
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
