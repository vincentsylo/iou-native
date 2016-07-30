import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Text from '../components/F8Text';
import { connect } from 'react-redux';
import { giftReceivedFetch, giftRedeem } from '../actions/gift';
import _ from 'lodash';
import { secondary, danger, success, accent } from '../styles/colors';
import GiftButton from '../components/GiftButton';
import ProfilePicture from '../components/ProfilePicture';

@connect(state => ({ gift: state.gift }))
export default class Redeem extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    gift: PropTypes.object,
  };

  state = {
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  };

  componentDidMount() {
    this.props.dispatch(giftReceivedFetch());
    this.updateDataSource(_.get(this.props, 'gift.received') || []);
  }

  componentWillReceiveProps(nextProps: object) {
    this.updateDataSource(_.get(nextProps, 'gift.received') || []);
  }

  updateDataSource(received: array) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const newDs = ds.cloneWithRows(received);
    this.setState({
      dataSource: newDs,
    });
  }
  
  redeemGift(id) {
    Alert.alert(
      'Redeem',
      'Are you sure you want to redeem this gift?',
      [
        { text: 'Yes', onPress: () => this.props.dispatch(giftRedeem(id)) },
        { text: 'Not Now' },
      ]
    );
  }

  renderSeparator(sectionID: number, rowID: number) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: accent,
        }}
      />
    );
  }

  renderRow(row: object) {
    const { Sender, giftType, redeemed, id } = row;
    const { picture, name} = Sender;

    return (
      <View
        style={styles.row}>
        <View style={styles.left}>
          <ProfilePicture picture={picture} fbId={Sender.facebookId} />
        </View>

        <View style={styles.center}>
          <Text>{name}</Text>
        </View>

        <View style={styles.right}>
          <GiftButton
            disabled={redeemed}
            giftType={giftType}
            redeemGift={() => ::this.redeemGift(id)}
            style={{ borderColor: redeemed ? danger : success, borderWidth: 1 }}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <ListView
        enableEmptySections
        style={styles.root}
        renderRow={::this.renderRow}
        renderSeparator={::this.renderSeparator}
        dataSource={this.state.dataSource}
      />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: secondary,
    paddingVertical: 10,
    alignItems: 'center',
  },
  picture: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  left: {
    marginHorizontal: 10,
  },
  center: {
    flex: 1,
  },
  right: {
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    padding: 10,
  },
});