import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Text from '../components/F8Text';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { peopleSearch } from '../actions/people';
import { primary, info } from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import GiftButton from '../components/GiftButton';
import { giftSend } from '../actions/gift';
import { BEER, FOOD, COFFEE, HEART } from '../constants/giftTypes';

@connect(state => ({ person: state.people.person }))
export default class Profile extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    person: PropTypes.object,
    personId: PropTypes.string,
  };

  componentDidMount() {
    const { dispatch, personId } = this.props;
    if (personId) {
      dispatch(peopleSearch(personId));
    }
  }

  handleSelect(gift) {
    const { personId, dispatch } = this.props;
    dispatch(giftSend(personId, gift));
  }
  
  render() {
    const { person } = this.props;
    const { width } = Dimensions.get('window');

    return person ? (
      <View style={styles.root}>
        <Image resizeMode="stretch" source={{ uri: person.cover }} style={styles.cover} />
        <Image
          source={{ uri: person.picture }}
          style={[styles.profilePicture, { left: (width - 150) / 2 }]}
        />
        <View style={styles.profile}>
          <Text style={styles.name}>{person.name}</Text>
          <Icon name="star" style={styles.starIcon} />
          <View style={styles.row}>
            <View style={styles.gift}>
              <GiftButton selectGift={::this.handleSelect} giftType={FOOD.name} />
            </View>
            <View style={styles.gift}>
              <GiftButton selectGift={::this.handleSelect} giftType={BEER.name} />
            </View>
            <View style={styles.gift}>
              <GiftButton selectGift={::this.handleSelect} giftType={HEART.name} />
            </View>
            <View style={styles.gift}>
              <GiftButton selectGift={::this.handleSelect} giftType={COFFEE.name} />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={Actions.pop} style={styles.closeButton}>
            <Icon name="remove" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cover: {
    backgroundColor: '#000',
    height: 720/4,
  },
  profilePicture: {
    position: 'absolute',
    height: 150,
    width: 150,
    borderRadius: 75,
    top: 100,
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 10,
  },
  profile: {
    flex: 1,
    alignItems: 'center',
    top: 75,
    borderTopWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
  },
  starIcon: {
    fontSize: 22,
    color: primary,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  gift: {
    marginHorizontal: 10,
  },
  closeButton: {
    backgroundColor: info,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 28,
    color: '#fff',
  },
  footer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  }
});