import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TabBar extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
  };

  // color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    const { tabs, goToPage, activeTab } = this.props;

    return (
      <View style={styles.tabs}>
        {
          tabs.map((tab, i) => {
            return (
              <TouchableOpacity key={tab} onPress={() => goToPage(i)} style={styles.tab}>
                <Icon
                  name={tab}
                  size={25}
                  color={activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
                />
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    paddingVertical: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
});