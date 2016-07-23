import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Text from '../components/F8Text';
import { connect } from 'react-redux';
import { peopleFetch } from '../actions/people';
import { giftSend } from '../actions/gift';
import { secondary } from '../styles/colors';
import _ from 'lodash';
import GiftContainer from '../components/GiftContainer';

@connect(state => ({ people: state.people }))
export default class People extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    people: PropTypes.object,
  };

  state = {
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
  };

  componentDidMount() {
    this.props.dispatch(peopleFetch());
    this.updateDataSource(_.get(this.props, 'people.friends') || []);
  }

  componentWillReceiveProps(nextProps: object) {
    this.updateDataSource(_.get(nextProps, 'people.friends') || []);
  }

  updateDataSource(friends: array) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const newDs = ds.cloneWithRows(friends);
    this.setState({
      dataSource: newDs,
    });
  }

  selectGift(fbId, type) {
    this.props.dispatch(giftSend(fbId, type));
  }

  renderRow(row: object) {
    const pictureUrl = _.get(row, 'picture.data.url');

    return (
      <View
        style={styles.row}>
        <View style={styles.left}>
          <TouchableOpacity>
            <Image source={{ uri: pictureUrl }} style={styles.picture} />
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <Text>{row.name}</Text>
        </View>

        <View style={styles.right}>
          <GiftContainer selectGift={::this.selectGift} fbId={row.id} />
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