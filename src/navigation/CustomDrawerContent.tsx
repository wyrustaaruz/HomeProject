import React, {useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';
import {Divider} from '../components/Divider';
import {ErrorMessage} from '../components/ErrorMessage';
import LoadingIndicator from '../components/LoadingIndicator';
import Colors from '../constants/colors';
import {getMenuItems} from '../service/api/Common';
import {MenuChildrenType, MenuType} from '../types/Menu';

type CustomDrawerItemType = {
  title: string;
  navigateTo?: string;
  imageUrl?: string;
  children?: MenuChildrenType[];
};
export function CustomDrawerContent({navigation}: any) {
  const {isLoading, error, data, refetch} = useQuery<MenuType[], Error>(
    ['sidemenu'],
    getMenuItems,
  );

  const renderChildrenCategoryItem = useCallback(({item}) => {
    return (
      <View>
        <Text style={[styles.text, styles.alignRight]}>{item}</Text>
      </View>
    );
  }, []);
  const renderChildrenItem = useCallback(({item}) => {
    return (
      <View>
        <Text style={styles.text}>{item.name}</Text>
        <FlatList
          contentContainerStyle={styles.container}
          data={item.categories}
          renderItem={renderChildrenCategoryItem}
          ItemSeparatorComponent={() => <Divider />}
        />
      </View>
    );
  }, []);

  const CustomDrawerItem = ({
    navigateTo,
    title,
    imageUrl,
    children,
  }: CustomDrawerItemType) => {
    if (children) {
      return (
        <View style={styles.itemContainer}>
          <View style={styles.buttonContainer}>
            <Image
              source={{uri: imageUrl}}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>{title}</Text>
          </View>
          <FlatList
            contentContainerStyle={styles.container}
            data={children}
            renderItem={renderChildrenItem}
            ItemSeparatorComponent={() => <Divider />}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.itemContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              navigation.toggleDrawer();
              navigation.navigate(navigateTo);
            }}>
            <Image
              source={{uri: imageUrl}}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>{title}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderItem = ({item}: {item: MenuType}) => {
    return (
      <CustomDrawerItem
        navigateTo="ProductList"
        title={item.name}
        imageUrl={item.img}
        children={item.children}
      />
    );
  };

  if (isLoading) return <LoadingIndicator />;

  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1, backgroundColor: Colors.LightGray},
  container: {
    backgroundColor: Colors.DarkGray,
  },
  itemContainer: {flex: 1, padding: 20},
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {width: 50, height: 50},
  text: {fontSize: 20, color: Colors.Gold},
  alignRight: {textAlign: 'right'},
});
