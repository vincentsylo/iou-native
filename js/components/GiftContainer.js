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
import { primary, accent, success } from '../styles/colors';
import GiftButton from './GiftButton';
import { BEER, FOOD, COFFEE, HEART } from '../constants/giftTypes';

export default class GiftContainer extends Component {
  static propTypes = {
    sendGift: PropTypes.func,
    fbId: PropTypes.string,
    toggleMenu: PropTypes.func,
    disabled: PropTypes.bool,
  };

  state = {
    selected: '',
    open: false,
    showTick: false,
  };

  openMenu() {
    const { toggleMenu, fbId } = this.props;

    this.setState({
      open: true,
    }, () => toggleMenu(fbId));
  }

  closeMenu() {
    const { toggleMenu, fbId } = this.props;

    this.setState({
      open: false,
    }, () => toggleMenu(fbId));
  }

  toggleTick() {
    this.setState({
      showTick: !this.state.showTick,
    });
  }

  handleSelect(gift) {
    const { fbId, sendGift } = this.props;
    sendGift(fbId, gift);

    this.setState({
      open: false,
    }, () => {
      ::this.toggleTick();
      setTimeout(::this.toggleTick, 2000);
      this.props.toggleMenu(fbId);
    });
  }

  render() {
    const { disabled } = this.props;
    const { open, showTick } = this.state;

    return disabled ? null : (
      open ? (
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
          {
            showTick ? (
              <View style={[styles.button, { backgroundColor: success }]}>
                <Icon name="check" style={styles.icon} size={24} color="#fff" />
              </View>
            ) : (
              <TouchableOpacity onPress={::this.openMenu}>
                <View style={styles.button}>
                  <Icon name="gift" style={[styles.icon, { color: primary }]} size={24} />
                </View>
              </TouchableOpacity>
            )
          }
        </View>
      )
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