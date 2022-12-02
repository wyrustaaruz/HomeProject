import React, {useCallback} from 'react';
import {useQuery} from 'react-query';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ProductListItem from './ProductListItem';
import {getProducts} from '../../service/api/Products';
import {useRefreshByUser} from '../../hooks/useRefreshByUser';
import {useRefreshOnFocus} from '../../hooks/useRefreshOnFocus';
import LoadingIndicator from '../../components/LoadingIndicator';
import {ErrorMessage} from '../../components/ErrorMessage';
import {Divider} from '../../components/Divider';
import {ProductType} from '../../types/Products';
import Colors from '../../constants/colors';

interface ProductListProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const ProductList: React.FC<ProductListProps> = ({navigation}) => {
  const {isLoading, error, data, refetch} = useQuery<ProductType[], Error>(
    ['productList'],
    getProducts,
  );
  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const onListItemPress = useCallback(
    product => {
      navigation.navigate('ProductDetail', {
        id: product.id,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}) => {
      return <ProductListItem item={item} onPress={onListItemPress} />;
    },
    [onListItemPress],
  );

  if (isLoading) return <LoadingIndicator />;

  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Divider />}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
});

export default ProductList;
