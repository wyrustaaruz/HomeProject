import * as React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.fill}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;
