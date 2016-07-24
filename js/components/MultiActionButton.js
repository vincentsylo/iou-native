import React, { Component, PropTypes } from 'react';
import { BEER, COFFEE, FOOD, HEART } from '../constants/giftTypes';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { primary, secondary } from '../styles/colors';
const gifts = [FOOD, BEER, COFFEE, HEART];

export default class MultiActionButton extends Component {
  static propTypes = {
    selectMultiGift: PropTypes.func,
  };

  render() {
    return (
      <ActionButton buttonColor={primary}>
        {
          gifts.map((gift, i) => {
            return (
              <ActionButton.Item
                key={i}
                buttonColor={secondary}
                onPress={() => this.props.selectMultiGift(gift)}
              >
                <Icon name={gift.icon} size={24} style={{ color: gift.color }} />
              </ActionButton.Item>
            );
          })
        }
      </ActionButton>
    );
  }
}