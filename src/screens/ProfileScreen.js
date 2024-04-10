import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <View style={styles.v1}>
      <Text>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
