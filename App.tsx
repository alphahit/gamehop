import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package",
]);
import React from 'react';
import {Provider} from 'react-redux';
//import { store } from './store';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import {store} from './store/store';

import SplashStack from './src/navigation/AppStack';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SplashStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
