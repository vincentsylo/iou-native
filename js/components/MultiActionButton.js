import React, { Component, PropTypes } from 'react';
import { BEER, COFFEE, FOOD, HEART } from '../constants/giftTypes';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { primary, secondary, success } from '../styles/colors';
const gifts = [FOOD, BEER, COFFEE, HEART];

export default class MultiActionButton extends Component {
  static propTypes = {
    selectMultiGift: PropTypes.func,
    showTick: PropTypes.bool,
  };

  render() {
    const { showTick } = this.props;

    return showTick ? (
      <ActionButton buttonColor={success} icon={<Icon name="check" color="#fff" size={24} />} />
    ) : (
      <ActionButton buttonColor={success}>
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