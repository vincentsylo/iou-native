import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { primary, accent } from '../styles/colors';
import GiftButton from './GiftButton';
import { BEER, FOOD, COFFEE, HEART } from '../constants/giftTypes';

export default class GiftContainer extends Component {
  static propTypes = {
    sendGift: PropTypes.func,
    fbId: PropTypes.string,
    toggleMenu: PropTypes.func,
  };

  state = {
    selected: '',
    open: false,
  };

  openMenu() {
    this.setState({
      open: true,
    }, this.props.toggleMenu);
  }

  closeMenu() {
    this.setState({
      open: false,
    }, this.props.toggleMenu);
  }

  handleSelect(gift) {
    const { fbId, sendGift } = this.props;
    sendGift(fbId, gift);
    this.setState({
      open: false,
    }, this.props.toggleMenu);
  }

  render() {
    const { open } = this.state;

    return open ? (
      <View style={styles.root}>
        <Animated.View style={styles.buttonContainer}>
          <GiftButton selectGift={::this.handleSelect} giftType={FOOD.name} />
          <GiftButton selectGift={::this.handleSelect} giftType={BEER.name} />
          <GiftButton selectGift={::this.handleSelect} giftType={HEART.name} />
          <GiftButton selectGift={::this.handleSelect} giftType={COFFEE.name} />
        </Animated.View>
        <TouchableOpacity onPress={::this.closeMenu}>
          <View style={styles.button}>
            <Icon name="close" style={[styles.icon, { color: '#cc0000' }]} size={24} />
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.root}>
        <TouchableOpacity onPress={::this.openMenu}>
          <View style={styles.button}>
            <Icon name="gift" style={[styles.icon, { color: primary }]} size={24} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    backgroundColor: accent,
    borderRadius: 18,
    height: 36,
    width: 36,
  }
});