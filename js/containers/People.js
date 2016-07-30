import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  ListView,
  View,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import Text from '../components/F8Text';
import { connect } from 'react-redux';
import { peopleFriendsFetch } from '../actions/people';
import { giftSend } from '../actions/gift';
import { secondary, accent, success, danger } from '../styles/colors';
import _ from 'lodash';
import GiftContainer from '../components/GiftContainer';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import MultiActionButton from '../components/MultiActionButton';
import GiftButton from '../components/GiftButton';
import ProfilePicture from '../components/ProfilePicture';
import { TICK } from '../constants/giftTypes';

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
    showTick: false,
  };

  componentDidMount() {
    this.props.dispatch(peopleFriendsFetch());
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

    _.forEach(recipients, (recipient) => {
      this.sendSingleGift(recipient, multiGift.name);
    });

    this.setState({
      multiGift: null,
      showTick: true,
    }, () => {
      setTimeout(() => this.setState({
        showTick: false,
        recipients: [],
      }), 2000);
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

  toggleMenu(id) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.selectRecipients(id);
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

  renderSingleGift(row) {
    const { showTick, recipients } = this.state;
    const selectedRecipient = _.indexOf(recipients, row.id) > -1;

    return showTick && selectedRecipient ? (
      <GiftButton disabled giftType={TICK.name} style={{ backgroundColor: success }} />
    ) : (
      <GiftContainer
        disabled={showTick}
        sendGift={::this.sendSingleGift}
        fbId={row.id}
        toggleMenu={::this.toggleMenu}
      />
    );
  }

  renderMultiGift(row) {
    const { multiGift, recipients } = this.state;
    const selectedRecipient = _.indexOf(recipients, row.id) > -1;

    return selectedRecipient ? (
      <TouchableOpacity onPress={() => ::this.selectRecipients(row.id)}>
        <GiftButton disabled giftType={multiGift.name} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() => ::this.selectRecipients(row.id)}>
        <GiftButton disabled />
      </TouchableOpacity>
    );
  }

  renderRow(row: object) {
    const picture = _.get(row, 'picture.data.url');
    const { multiGift, recipients, showTick } = this.state;
    const selectedRecipient = _.indexOf(recipients, row.id) > -1;
    
    return (
      <View
        style={styles.row}>
        <View style={styles.left}>
          <ProfilePicture picture={picture} fbId={row.id} />
        </View>

        <View style={styles.center}>
          {
            !multiGift && selectedRecipient && !showTick ? null : <Text>{row.name}</Text>
          }
        </View>

        <View style={styles.right}>
          {
            multiGift ? (
              ::this.renderMultiGift(row)
            ) : (
              ::this.renderSingleGift(row)
            )
          }
        </View>
      </View>
    );
  }

  render() {
    const { multiGift, recipients, showTick } = this.state;

    return (
      <View style={styles.root}>
        <ListView
          enableEmptySections
          style={styles.root}
          renderRow={::this.renderRow}
          renderSeparator={::this.renderSeparator}
          dataSource={this.state.dataSource}
        />
        {
          multiGift ? (
            recipients.length > 0 ?
              <ActionButton
                buttonColor={success}
                icon={<Icon name="send" size={16} style={styles.icon} />}
                onPress={::this.sendMultiGift}
              />
              :
              <ActionButton
                buttonColor={danger}
                icon={<Icon name="undo" size={16} style={styles.icon} />}
                onPress={() => this.setState({ multiGift: null })}
              />
          ) : <MultiActionButton selectMultiGift={::this.selectMultiGift} showTick={showTick} />
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