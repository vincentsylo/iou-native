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
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiActionButton from '../components/MultiActionButton';
import GiftButton from '../components/GiftButton';

@connect(state => ({ people: state.people }))
export default class People extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    people: PropTypes.object,
  };

  state = {
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    multiGift: null,
    recipients: [],
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

  sendSingleGift(fbId, type) {
    this.props.dispatch(giftSend(fbId, type));
  }

  sendMultiGift() {
    const { multiGift, recipients } = this.state;

    this.setState({
      multiGift: null,
    }, () => {
      _.forEach(recipients, (recipient) => {
        this.sendSingleGift(recipient, multiGift.name);
      });
    });
  }

  selectMultiGift(type) {
    this.setState({
      multiGift: type,
    });
  }

  selectRecipients(fbId) {
    const { recipients } = this.state;
    const selectedRecipient = _.indexOf(recipients, fbId) > -1;
    let newRecipients = _.slice(recipients);

    if (selectedRecipient) {
      _.pull(newRecipients, fbId);
    } else {
      newRecipients.push(fbId);
    }

    this.setState({
      recipients: newRecipients,
    });
  }

  renderRow(row: object) {
    const pictureUrl = _.get(row, 'picture.data.url');
    const { multiGift, recipients } = this.state;
    const selectedRecipient = _.indexOf(recipients, row.id) > -1;
    
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
          {
            multiGift ? (
              selectedRecipient ?
                <TouchableOpacity onPress={() => ::this.selectRecipients(row.id)}>
                  <GiftButton disabled giftType={multiGift.name} />
                </TouchableOpacity>
                  :
                <TouchableOpacity onPress={() => ::this.selectRecipients(row.id)}>
                  <GiftButton disabled />
                </TouchableOpacity>
            ) : <GiftContainer sendGift={::this.sendSingleGift} fbId={row.id} />
          }
        </View>
      </View>
    );
  }

  render() {
    const { multiGift, recipients } = this.state;

    return (
      <View style={styles.root}>
        <ListView
          enableEmptySections
          style={styles.root}
          renderRow={::this.renderRow}
          dataSource={this.state.dataSource}
        />
        {
          multiGift ? (
            recipients.length > 0 ?
              <ActionButton
                buttonColor="#00cc00"
                icon={<Icon name="send" size={16} style={styles.icon} />}
                onPress={::this.sendMultiGift}
              />
              :
              <ActionButton
                buttonColor="rgba(231,76,60,1)"
                icon={<Icon name="undo" size={16} style={styles.icon} />}
                onPress={() => this.setState({ multiGift: null })}
              />
          ) : <MultiActionButton selectMultiGift={::this.selectMultiGift} />
        }
      </View>
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
  icon: {
    color: secondary,
  },
});