import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CustomDrawerContent} from './CustomDrawerContent';
import ProductDetail from '../screens/Products/ProductDetail';
import Cart from '../screens/Cart/BasketCart';
import Colors from '../constants/colors';
import ProductList from '../screens/Products/ProductList';
import {RootStackParamList} from '../types/Root';
import {Image, TouchableOpacity} from 'react-native';
import {Badge} from 'react-native-paper';
import shopContext from '../context/shop-context';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        drawerType: 'back',
        headerShown: false,
        overlayColor: 'transparent',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={RootNavigator} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const customHeader = {
  headerStyle: {
    backgroundColor: Colors.LightGray,
  },
  headerTintColor: Colors.Gold,
  headerBackTitle: '',
};
function RootNavigator({navigation}: any) {
  const {cart} = React.useContext(shopContext);
  const cartCount = cart.reduce((count, curItem) => {
    return count + curItem.quantity;
  }, 0);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={{
          ...customHeader,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={require('../../src/assets/images/menu_icon_gold.png')}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Cart');
              }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={require('../../src/assets/images/basket_cart.png')}
              />
              {cartCount > 0 && (
                <Badge style={{position: 'absolute', top: -4, right: -4}}>
                  {cartCount}
                </Badge>
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          ...customHeader,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Cart');
              }}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={require('../../src/assets/images/basket_cart.png')}
              />
              {cartCount > 0 && (
                <Badge style={{position: 'absolute', top: -4, right: -4}}>
                  {cartCount}
                </Badge>
              )}
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          ...customHeader,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
