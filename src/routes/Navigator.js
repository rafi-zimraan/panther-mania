import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AuthMethod,
  Home,
  LibsTest,
  OnBoarding,
  SignIn,
  SignUp,
  Splash,
  UserProfile,
} from '../screens';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();
export default function Navigator() {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen component={LibsTest} name={'LibsTest'} /> */}
        <Stack.Screen component={Splash} name={'Splash'} />
        <Stack.Screen component={OnBoarding} name={'OnBoarding'} />
        <Stack.Screen component={AuthMethod} name={'AuthMethod'} />
        <Stack.Screen component={SignIn} name={'SignIn'} />
        <Stack.Screen component={SignUp} name={'SignUp'} />
        <Stack.Screen component={Home} name={'Home'} />
        <Stack.Screen component={UserProfile} name={'UserProfile'} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
