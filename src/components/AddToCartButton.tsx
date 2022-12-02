import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';
import shopContext from '../context/shop-context';
import {ProductType} from '../types/Products';

interface ComponentProps {
  item: ProductType | undefined;
}

export const AddToCartButton: React.FC<ComponentProps> = ({item}) => {
  const context = useContext(shopContext);
  return (
    <TouchableOpacity
      style={styles.addToCartButton}
      onPress={() => item && context.addProductToCart(item)}
      accessibilityRole="button">
      <Text style={styles.text}>Add to cart</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addToCartButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Black,
    padding: 10,
  },
  text: {flexShrink: 1, fontWeight: 'bold', color: Colors.Gold},
});
