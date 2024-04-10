import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MessagesScreen = () => {
  return (
    <View style={styles.v1}>
      <Text>Messages Screen</Text>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
