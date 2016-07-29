import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Text from '../components/F8Text';
import { connect } from 'react-redux';
import { giftSentFetch, giftRemind } from '../actions/gift';
import _ from 'lodash';
import { secondary, accent, danger, success } from '../styles/colors';
import GiftButton from '../components/GiftButton';
import ProfilePicture from '../components/ProfilePicture';

@connect(state => ({ gift: state.gift }))
export default class Owe extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    gift: PropTypes.object,
  };

  state = {
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  };

  componentDidMount() {
    this.props.dispatch(giftSentFetch());
    this.updateDataSource(_.get(this.props, 'gift.sent') || []);
  }

  componentWillReceiveProps(nextProps: object) {
    this.updateDataSource(_.get(nextProps, 'gift.sent') || []);
  }

  updateDataSource(sent: array) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const newDs = ds.cloneWithRows(sent);
    this.setState({
      dataSource: newDs,
    });
  }

  remindGift(id, name) {
    Alert.alert(
      'Remind',
      `Are you sure you want to remind ${name} about this gift?`,
      [
        { text: 'Yes', onPress: () => this.props.dispatch(giftRemind(id)) },
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
    const { Recipient, giftType, redeemed, id } = row;
    const { picture, name } = Recipient;

    return (
      <View
        style={styles.row}>
        <View style={styles.left}>
          <ProfilePicture picture={picture} fbId={id} />
        </View>

        <View style={styles.center}>
          <Text>{name}</Text>
        </View>

        <View style={styles.right}>
          <GiftButton
            disabled={redeemed}
            giftType={giftType}
            style={{ borderColor: redeemed ? danger : success, borderWidth: 1 }}
            remindGift={() => ::this.remindGift(id, name)}
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
  },
});