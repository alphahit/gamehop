import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MomentsScreen = () => {
  return (
    <View style={styles.v1}>
      <Text>Moments Screen</Text>
    </View>
  );
};

export default MomentsScreen;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
