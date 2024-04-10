/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  BackHandler,
  NativeModules,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//import RNExitApp from 'react-native-exit-app';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addMyProducts} from '../../store/slices/MyProductSlice';
import {paidGames} from '../model/data';
// import DeviceInfo from 'react-native-device-info';
// import RNRootbeer from 'react-native-rootbeer';

export const SplashScreen = () => {
  const [vendors, setvendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    const disableBackButton = () => {
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', disableBackButton);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', disableBackButton);
    };
  }, []);

  // useEffect(() => {
  //   for (let i = 0; i < paidGames.length; i++){
  //     dispatch(addMyProducts(paidGames[i]))
  //   }
  // },[])
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);
  }, [navigation]);

  // useEffect(() => {
  //   console.log(
  //     'DeviceInfo.isEmulator()===============>',
  //     DeviceInfo.isEmulator(),
  //   );
  //   //console.log("DeviceInfo.isDeviceRooted()===============>",DeviceInfo.isDeviceRooted())
  //   console.log(
  //     'DeviceInfo.isCameraPresent()===============>',
  //     JSON.stringify(DeviceInfo.isCameraPresent()),
  //   );
  //   console.log(
  //     'DeviceInfo.getCarrier()===============>',
  //     JSON.stringify(DeviceInfo.getCarrier()),
  //   );
  //   console.log(
  //     'DeviceInfo.getDevice()===============>',
  //     JSON.stringify(DeviceInfo.getDevice()),
  //   );
  //   console.log(
  //     'DeviceInfo.getDeviceName()===============>',
  //     JSON.stringify(DeviceInfo.getDeviceName()),
  //   );
  //   console.log(
  //     'DeviceInfo.getFirstInstallTime()===============>',
  //     JSON.stringify(DeviceInfo.getFirstInstallTime()),
  //   );
  //   console.log(
  //     'DeviceInfo.getIpAddress()===============>',
  //     JSON.stringify(DeviceInfo.getIpAddress()),
  //   );
  //   console.log('DeviceInfo.getModel()===============>', DeviceInfo.getModel());

  //   rootChecker();
  // }, []);
  // const rootChecker = async () => {
  //   const isRooted = await RNRootbeer.isRooted();
  //   const isRootedWithBusyBoxCheck =
  //     await RNRootbeer.isRootedWithBusyBoxCheck();

  //   console.log(
  //     'isRooted================================>',
  //     isRooted,
  //     'isRootedWithBusyBoxCheck========================>',
  //     isRootedWithBusyBoxCheck,
  //   );
  //   isRooted && RNExitApp.exitApp();
  // };
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFED7',
      }}>
      <Image
        style={{height: 300, width: 500}}
        resizeMode="contain"
        source={require('../assets/images/gamehop.png')}
      />
      <View style={{}}>
        <Text
          style={{
            color: '#AD40AF',
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '700',
            marginTop: 20,
          }}>
          GAMEHOP{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
};
