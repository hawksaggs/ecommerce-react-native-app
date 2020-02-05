import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

import { Block, Text, Button } from '../components';
import { theme, mocks } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Browse extends Component {
  state = {
    active: 'Products'
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = tab === active;
    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        style={[styles.tab, isActive ? styles.active : null]}
        onPress={() => this.setState({active: tab})}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { profile } = this.props;
    const tabs = ['Products', 'Inspirations', 'Shop'];
    return (
      <Block>
        {/* Header */}
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
          <Button>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>
        {/* Tab Section */}
        <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block>
      </Block>
    );
  }
}

Browse.defaultProps = {
  profile: mocks.profile
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: 0.5, //for iOS : StyleSheet.hairLineWidth
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  }
});
