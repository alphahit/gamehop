/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          style={{height: 150, width: 300}}
          resizeMode="contain"
          source={require('../assets/images/gamehop.png')}
        />
        <Text style={styles.title}>Welcome!</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#AD40AF"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            width: '90%',
            borderRadius: 10,
            margin: 12,
            borderWidth: 1,
            paddingHorizontal: 10,
            borderColor: '#AD40AF',
            padding: 0,
            color: 'black',
            backgroundColor: '#fcf1ff',
          }}>
          <TextInput
            style={{
              height: '100%',
              width: '90%',
              borderRadius: 10,
              borderColor: '#AD40AF',
              color: 'black',
              backgroundColor: '#fcf1ff',
              margin: 0,
            }}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            placeholderTextColor="#AD40AF"
          />
          <TouchableOpacity style={{width: '10%'}}>
            <AntDesign
              onPress={() => setShowPassword(!showPassword)}
              name="eye"
              size={25}
              color="#AD40AF"
              style={{marginLeft: 5}}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFED7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#AD40AF',
    marginVertical: 20,
  },
  input: {
    height: 50,
    width: '90%',
    borderRadius: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#AD40AF',
    color: 'black',
    backgroundColor: '#fcf1ff',
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#AD40AF',
    paddingVertical: 12,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
