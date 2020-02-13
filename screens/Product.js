import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { Button, Block, Text } from '../components';
import { theme, mocks } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';

export default class Product extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <Button onPress={() => {}}>
          <Entypo name="dots-three-horizontal" color={theme.colors.gray} />
        </Button>
      )
    };
  };
  render() {
    const { product } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.product}>
          <Text h2 bold>
            {product.name}
          </Text>
          <Block flex={false} row margin={[theme.sizes.base, 0]}>
            {product.tags.map(tag => (
              <Text key={`tag-${tag}`} caption gray style={styles.tag}>
                {tag}
              </Text>
            ))}
          </Block>
          <Text gray light height={22}>
            {product.description}
          </Text>
        </Block>
      </ScrollView>
    );
  }
}

Product.defaultProps = {
  product: mocks.products[0]
};

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingVertical: theme.sizes.padding
  },
  tag: {
    borderColor: theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.base,
    paddingVertical: theme.sizes.base / 2.5,
    marginRight: theme.sizes.base * 0.625
  }
});
