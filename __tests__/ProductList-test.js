import React from 'react';
import {render} from '@testing-library/react-native';
import ProductListItem from '../src/screens/Products/ProductListItem';
import {mockProductList} from '../__mocks__/mockFile';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-paper', () => ({
  TouchableRipple: 'TouchableRipple',
}));
const mockProduct = mockProductList[0];

describe('render product check', () => {
  it('should render name of ProductListItem', () => {
    const {getByText} = render(<ProductListItem item={mockProduct} />);

    const item = getByText(
      'Black Sheet Strappy Textured Glitter Bodycon Dress',
    );
    expect(item).toBeTruthy();
  });
  it('should render colour of ProductListItem', () => {
    const {getByText} = render(<ProductListItem item={mockProduct} />);

    const item = getByText('Colour: Black');
    expect(item).toBeTruthy();
  });
  it('should render price of ProductListItem', () => {
    const {getByText} = render(<ProductListItem item={mockProduct} />);

    const item = getByText('Price: £10');
    expect(item).toBeTruthy();
  });
  it('should not render id of ProductListItem', () => {
    const {queryByText} = render(<ProductListItem item={mockProduct} />);

    const item = queryByText('1');
    expect(item).toBeNull();
  });
});
