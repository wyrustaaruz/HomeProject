import React, {useCallback, useContext} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Divider} from '../../components/Divider';
import Colors from '../../constants/colors';
import shopContext from '../../context/shop-context';
import {imageCheck} from '../../utils/imageCheck';

interface BasketCartProps {}

const BasketCart: React.FC<BasketCartProps> = () => {
  const {cart, removeProductFromCart} = useContext(shopContext);
  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri: imageCheck(item.img)}}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.flex1}>
          <Text>{item.name}</Text>
          <Text>Price: {item.price}</Text>
          <Text>Colour: {item.colour}</Text>
          <Text>Quantity: {item.quantity}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => removeProductFromCart(item.id)}>
            <Text style={styles.whiteText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => <Text>No Item in the Cart!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    padding: 16,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: Colors.LightGray,
    padding: 10,
  },
  image: {width: 50, height: 50},
  title: {flexShrink: 1, fontWeight: 'bold'},
  flex1: {flex: 1},
  whiteText: {color: Colors.White},
});

export default BasketCart;
