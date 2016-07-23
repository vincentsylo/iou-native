import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { primary, secondary, accent } from '../styles/colors';
import GiftButton from './GiftButton';

const HOLD_DURATION = 200;
const ANIMATION_DURATION = 300;

export default class GiftContainer extends Component {
  static propTypes = {
    selectGift: PropTypes.func,
    fbId: PropTypes.string,
  };

  state = {
    holdTime: new Animated.Value(0),
    menuTime: new Animated.Value(0),
    selectedTime: new Animated.Value(0),
    selected: '',
    open: false,
  };

  handlePressIn() {
    Animated.timing(this.state.holdTime, {
      duration: HOLD_DURATION,
      toValue: 1,
    }).start(() => {
      Animated.timing(this.state.menuTime, {
        duration: ANIMATION_DURATION,
        toValue: 1,
      }).start(::this.holdComplete);
    });
  }

  handlePressOut(force) {
    this.state.holdTime.setValue(0);

    if (this.state.menuTime._value !== 1 || force) {
      Animated.timing(this.state.menuTime, {
        duration: this.state.menuTime._value * ANIMATION_DURATION,
        toValue: 0,
      }).start(::this.holdEnd);
    }
  }

  holdComplete() {
    if (this.state.holdTime._value === 1) {
      this.setState({
        open: true,
      });
    }
  }

  holdEnd() {
    this.setState({
      open: false,
    });
  }

  handleSelect(gift) {
    const { fbId, selectGift } = this.props;
    selectGift(fbId, gift);
  }

  render() {
    const { open, menuTime } = this.state;

    const rootClass = [
      styles.root,
      open ? styles.openRoot : null,
    ];
    const containerClass = [
      styles.buttonContainer,
      {
        transform: [{ scaleY: menuTime }],
      },
    ];

    return (
      <Animated.View style={rootClass}>
        <Animated.View style={containerClass}>
          <GiftButton selectGift={::this.handleSelect} giftType="food" />
          <GiftButton selectGift={::this.handleSelect} giftType="beer" />
          <GiftButton selectGift={::this.handleSelect} giftType="heart" />
          <GiftButton selectGift={::this.handleSelect} giftType="coffee" />
        </Animated.View>
        <View>
          {
            open ?
              <TouchableOpacity onPress={() => this.handlePressOut(true)}>
                <View style={styles.button}>
                  <Icon name="close" style={[styles.icon, { color: '#cc0000' }]} size={24} />
                </View>
              </TouchableOpacity>
              :
              <TouchableWithoutFeedback
                onPressIn={::this.handlePressIn}
                onPressOut={() => this.handlePressOut(false)}
              >
                <Animated.View style={styles.button}>
                  <Icon name="gift" style={[styles.icon, { color: primary }]} size={24} />
                </Animated.View>
              </TouchableWithoutFeedback>
          }
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    backgroundColor: accent,
    borderRadius: 5,
  },
  openRoot: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 46, // sum of button width + margin
    backgroundColor: accent,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    height: 54,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: secondary,
    borderRadius: 15,
    height: 36,
    width: 36,
  }
});