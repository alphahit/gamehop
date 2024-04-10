import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.v1}>
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  v1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
