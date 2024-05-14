import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from '@screens/Home';

import {LoginScreen} from '@screens/Login';
import {TabNav} from '@navigation/tabNav';
import {StackNavigation} from '@navigation/stackNav';
import {SplashScreen} from '@screens/splashScreen';

const NavigatorScreen = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StackNav"
          component={StackNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {NavigatorScreen};
