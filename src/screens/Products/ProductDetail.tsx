import React, {useEffect} from 'react';
import {Text, Image, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import {getProductDetail} from '../../service/api/Products';
import {useRefreshOnFocus} from '../../hooks/useRefreshOnFocus';
import LoadingIndicator from '../../components/LoadingIndicator';
import {ErrorMessage} from '../../components/ErrorMessage';
import type {ProductDetailType} from '../../types/Products';
import {useNavigation} from '@react-navigation/native';
import {imageCheck} from '../../utils/imageCheck';
import {AddToCartButton} from '../../components/AddToCartButton';
import Colors from '../../constants/colors';

interface ProductDetailProps {
  route: any;
}

var width = Dimensions.get('window').width;

const ProductDetail: React.FC<ProductDetailProps> = ({route}) => {
  const {isLoading, error, data, refetch} = useQuery<ProductDetailType, Error>(
    ['productDetail'],
    () => getProductDetail(route.params.id),
  );
  useRefreshOnFocus(refetch);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({title: data?.name});
  }, [data]);
  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;
  const {name, img, colour, price} = data || {};

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: imageCheck(img)}}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{name}</Text>
      <Text>Colour: {colour}</Text>
      <Text>Price: £{price}</Text>
      <AddToCartButton item={data} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    padding: 16,
  },
  image: {width: width, height: 500},
  title: {flexShrink: 1, fontWeight: 'bold'},
});

export default ProductDetail;
