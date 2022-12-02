import React from 'react';
import {ProductType, CartType} from '../types/Products';

interface CartContextInterface {
  cart: CartType[];
  addProductToCart: (product: ProductType) => void;
  removeProductFromCart: (productId: number) => void;
}

export default React.createContext<CartContextInterface>({
  cart: [],
  addProductToCart: product => {},
  removeProductFromCart: productId => {},
});
