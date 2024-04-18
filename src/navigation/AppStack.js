import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Home from '../screens/Home';

// import {createDrawerNavigator} from '@react-navigation/drawer';
// import ProfileScreen from '../screens/ProfileScreen';
// import MessagesScreen from '../screens/MessagesScreen';
// import MomentsScreen from '../screens/MomentsScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import CustomDrawer from '../components/CustomDrawer';
import CartScreen from '../screens/CartScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '../screens/SplashScreen';
import OrderAnimation from '../screens/OrderAnimation';
import UpcomingGames from '../screens/UpcomingGames';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

function SplashStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Upcoming" component={UpcomingGames} />
      <Stack.Screen
        component={CartScreen}
        name="Cart"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="OrderAnimation" component={OrderAnimation} />
    </Stack.Navigator>
  );
}

//const Drawer = createDrawerNavigator();

// const AppStack = () => {
//   return (
//     <Drawer.Navigator
//       drawerContent={props => <CustomDrawer {...props} />}
//       screenOptions={{headerShown: false}}>
//       <Drawer.Screen component={Home} name="DrawerHome" />
//       <Drawer.Screen component={ProfileScreen} name="Profile" />
//       <Drawer.Screen component={MessagesScreen} name="Messages" />
//       <Drawer.Screen component={MomentsScreen} name="Moments" />
//       <Drawer.Screen component={SettingsScreen} name="Settings" />
//     </Drawer.Navigator>
//   );
// };

export default SplashStack;

const styles = StyleSheet.create({});
