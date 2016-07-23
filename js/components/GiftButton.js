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
import { primary, secondary } from '../styles/colors';

const SELECT_DURATION = 1000;
const ICON_SIZE = 24;

export default class GiftButton extends Component {
  static propTypes = {
    selectGift: PropTypes.func,
    giftType: PropTypes.string,
    disabled: PropTypes.bool,
  };

  state = {
    selected: false,
    selectedTime: new Animated.Value(0),
  };

  handleSelect() {
    const { selectGift, giftType } = this.props;
    const { selectedTime } = this.state;

    this.setState({
      selected: true,
    }, () => {
      Animated.timing(selectedTime, {
        duration: SELECT_DURATION,
        toValue: 4,
      }).start(() => {
        this.setState({
          selected: false,
        });
        selectedTime.setValue(0);
        selectGift(giftType);
      });
    });
  }

  getSelectedGiftStyle() {
    const { selectedTime } = this.state;

    return {
      transform: [{
        rotate: selectedTime.interpolate({
          inputRange: [0, 1, 2, 3, 4],
          outputRange: ['0deg', '-30deg', '0deg', '30deg', '0deg'],
        }),
      }],
    };
  }

  getMap() {
    switch (this.props.giftType) {
      case 'beer':
        return {
          icon: 'beer',
          color: 'orange',
        };
      case 'food':
        return {
          icon: 'cutlery',
          color: 'silver',
        };
      case 'coffee':
        return {
          icon: 'coffee',
          color: primary,
        };
      case 'heart':
        return {
          icon: 'heart',
          color: 'red',
        };
      default: return {};
    }
  }

  renderView() {
    const { selected } = this.state;

    return (
      <Animated.View style={[styles.button, selected ? ::this.getSelectedGiftStyle() : null]}>
        <Icon name={::this.getMap().icon} style={[styles.icon, { color: ::this.getMap().color }]} size={ICON_SIZE} />
      </Animated.View>
    );
  }

  render() {
    const { disabled } = this.props;

    return disabled ?
      ::this.renderView() :
      (
        <TouchableOpacity onPress={::this.handleSelect}>
          {::this.renderView()}
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
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