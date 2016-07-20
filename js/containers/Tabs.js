import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FacebookTabBar from '../components/FacebookTabBar';

export default class Tabs extends Component {
  render() {
    return (
      <ScrollableTabView
        style={{ marginTop: 20, }}
        initialPage={1}
        tabBarPosition="bottom"
        renderTabBar={() => <FacebookTabBar />}
      >
        <ScrollView tabLabel="book" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Owe</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="users" style={styles.tabView}>
          <View style={styles.card}>
            <Text>People</Text>
          </View>
        </ScrollView>
        <ScrollView tabLabel="gift" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Redeem</Text>
          </View>
        </ScrollView>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});
