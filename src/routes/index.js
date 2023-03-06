import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Home,
  Splash,
  AgendaKegiatan,
  DaftarAgenda,
  DaftarProduk,
  Login,
  Maps,
  OnBoarding,
  OnBoardingTwo,
  Payment,
  Profile,
  Register,
  UpdateProfile,
  QrScanner,
  LibsDemo,
} from '../screens';
import {navigationRef} from '../utils/navigators';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        // initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          orientation: 'portrait',
        }}>
        <Stack.Screen name="LibsDemo" component={LibsDemo} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="OnBoardingTwo" component={OnBoardingTwo} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="DaftarAgenda" component={DaftarAgenda} />
        <Stack.Screen name="AgendaKegiatan" component={AgendaKegiatan} />
        <Stack.Screen name="DaftarProduk" component={DaftarProduk} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="QrScanner" component={QrScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
