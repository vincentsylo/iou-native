import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Text from '../components/F8Text';
import { connect } from 'react-redux';
import { giftSentFetch } from '../actions/gift';
import _ from 'lodash';
import { secondary } from '../styles/colors';
import GiftButton from '../components/GiftButton';

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

  renderRow(row: object) {
    const pictureUrl = _.get(row, 'Recipient.picture');

    return (
      <View
        style={styles.row}>
        <View style={styles.left}>
          <TouchableOpacity>
            <Image source={{ uri: pictureUrl }} style={styles.picture} />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <Text>{_.get(row, 'Recipient.name')}</Text>
        </View>

        <View style={styles.right}>
          <GiftButton disabled giftType={_.get(row, 'giftType')} />
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