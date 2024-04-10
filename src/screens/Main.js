import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import GamingImg from '../assets/gaming.svg';
import {useNavigation} from '@react-navigation/native';
//Permissions
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
  checkMultiple,
  openSettings,
} from 'react-native-permissions';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  //The TouchableOpacity wrapper is used to reduce the opacity of button.
  //It allows background to be seen while the user press down.
  //The opacity of button will be controlled by wrapping the children
  //in an Animation.
} from 'react-native';
const Main = () => {
  // const requestCall = () => {
  //   request(PERMISSIONS.ANDROID.CALL_PHONE)
  //   .then((respose) => console.log(respose))
  // }
  // const requestLocation = () => {
  //   request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  //   .then((respose) => console.log(respose))
  // }

  const requestMultiplePermissions = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.CALL_PHONE,
      PERMISSIONS.ANDROID.CALL_PHONE,
    ]).then(statuses => {
      console.log('Call', statuses[PERMISSIONS.ANDROID.CALL_PHONE]);
      console.log(
        'Location',
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
      );
    });
  };

  const checkMultiplePermission = () => {
    checkMultiple([
      PERMISSIONS.ANDROID.CALL_PHONE,
      PERMISSIONS.ANDROID.CALL_PHONE,
    ]).then(statuses => {
      console.log('Call', statuses[PERMISSIONS.ANDROID.CALL_PHONE]);
      console.log(
        'Location',
        statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
      );
    });
  };
  // const checkLocationPermission = () => {
  //   check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  // .then((result) => {
  //   switch (result) {

  //     case RESULTS.DENIED:
  //       console.log('The permission has not been requested / is denied but requestable');
  //       break;
  //     case RESULTS.LIMITED:
  //       console.log('The permission is limited: some actions are possible');
  //       break;
  //     case RESULTS.GRANTED:
  //       console.log('The permission is granted');
  //       break;
  //     case RESULTS.BLOCKED:
  //       console.log('The permission is denied and not requestable anymore');
  //       break;
  //   }
  // })
  // .catch((error) => {
  //   // …
  // });
  // }

  React.useEffect(() => {
    checkMultiplePermission();
  }, []);

  // const checkCallPermission = () => {
  //   check(PERMISSIONS.ANDROID.CALL_PHONE)
  // .then((result) => {
  //   switch (result) {

  //     case RESULTS.DENIED:
  //       console.log('The permission has not been requested / is denied but requestable');
  //       break;
  //     case RESULTS.LIMITED:
  //       console.log('The permission is limited: some actions are possible');
  //       break;
  //     case RESULTS.GRANTED:
  //       console.log('The permission is granted');
  //       break;
  //     case RESULTS.BLOCKED:
  //       console.log('The permission is denied and not requestable anymore');
  //       break;
  //   }
  // })
  // .catch((error) => {
  //   // …
  // });
  // }

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safearr}>
      <Text style={styles.txt}>Game On!!</Text>

      <View style={{flexDirection: 'row'}}>
        <Icon name="heart-outline" size={30} color="red" />
        <Feather
          name="settings"
          size={30}
          onPress={() => {
            openSettings().catch(() => console.warn('cannot open settings'));
          }}
        />
      </View>

      <View style={styles.svgimg}>
        <GamingImg
          width={300}
          height={300}
          style={{transform: [{rotate: '-15deg'}]}}
        />
      </View>

      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          requestMultiplePermissions();

          // requestCall()
          // requestLocation()
          // checkCallPermission()
          // checkLocationPermission()
          navigation.navigate('Login');
        }}>
        <Text style={styles.txt1}>Let's Begin</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#FFFF00" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF00',
  },
  txt: {
    fontSize: 30,
    color: '#20315f',
    marginTop: 20,
    fontFamily: 'DancingScript-Bold',
  },
  touch: {
    marginBottom: 50,
    backgroundColor: '#AD40AF',
    padding: 20,
    width: '90%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt1: {
    fontSize: 18,
    color: '#FFFF00',
    fontFamily: 'BeVietnamPro-ExtraBoldItalic',
  },
  svgimg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Main;
