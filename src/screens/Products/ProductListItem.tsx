import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ProductType} from '../../types/Products';
import {imageCheck} from '../../utils/imageCheck';
import {AddToCartButton} from '../../components/AddToCartButton';

interface ProductListItemProps {
  item: ProductType;
  onPress: (item: ProductType) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({item, onPress}) => {
  const {name, img, colour, price} = item;

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.8}
      accessibilityRole="button">
      <View style={styles.item}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: imageCheck(img)}}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.productInformationContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.actionButtonsContainer}>
            <View style={styles.bottomInfoContainer}>
              <Text>Colour: {colour}</Text>
              <Text>Price: £{price}</Text>
            </View>
            <AddToCartButton item={item} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingHorizontal: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {width: '100%', height: 500},
  productInformationContainer: {
    marginBottom: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  bottomInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {flexShrink: 1, fontWeight: 'bold'},
});

export default ProductListItem;
