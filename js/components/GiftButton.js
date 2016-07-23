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
import { secondary } from '../styles/colors';

const SELECT_DURATION = 1000;
const ICON_SIZE = 24;

export default class GiftButton extends Component {
  static propTypes = {
    selectGift: PropTypes.func,
    giftType: PropTypes.string,
    icon: PropTypes.string,
  };

  state = {
    selected: false,
    selectedTime: new Animated.Value(0),
  };

  handleSelect() {
    this.setState({
      selected: true,
    }, () => {
      Animated.timing(this.state.selectedTime, {
        duration: SELECT_DURATION,
        toValue: 4,
      }).start(() => {
        this.setState({
          selected: false,
        });
        this.state.selectedTime.setValue(0);
        this.props.selectGift(this.props.giftType);
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

  render() {
    const { icon, color } = this.props;
    const { selected } = this.state;

    return (
      <TouchableOpacity onPress={::this.handleSelect}>
        <Animated.View style={[styles.button, selected ? ::this.getSelectedGiftStyle() : null]}>
          <Icon name={icon} style={[styles.icon, { color }]} size={ICON_SIZE} />
        </Animated.View>
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