import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Agenda,
  AgendaDetail,
  AuthMethod,
  EditUserProfile,
  Home,
  LibsTest,
  OnBoarding,
  PantherProduct,
  ProductDetail,
  QRSignIn,
  SaveOurSouls,
  ScanQR,
  SignIn,
  SignUp,
  Splash,
  SqaanQrUserDetails,
  UserProfile,
} from '../screens';
import RNBootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();
export default function Navigator() {
  const statusBarConfig = (barStyle = 'dark') => ({
    statusBarTranslucent: true,
    statusBarColor: 'transparent',
    statusBarStyle: barStyle,
  });

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          ...statusBarConfig(),
          headerShown: false,
        }}>
        {/* <Stack.Screen component={LibsTest} name={'LibsTest'} /> */}
        <Stack.Screen
          component={Splash}
          name={'Splash'}
          options={{...statusBarConfig('light')}}
        />
        <Stack.Screen component={OnBoarding} name={'OnBoarding'} />
        <Stack.Screen
          component={AuthMethod}
          name={'AuthMethod'}
          options={{...statusBarConfig('light')}}
        />
        <Stack.Screen component={SignIn} name={'SignIn'} />
        <Stack.Screen component={SignUp} name={'SignUp'} />
        <Stack.Screen component={Home} name={'Home'} />
        <Stack.Screen component={UserProfile} name={'UserProfile'} />
        <Stack.Screen component={ProductDetail} name={'ProductDetail'} />
        <Stack.Screen component={AgendaDetail} name={'AgendaDetail'} />
        <Stack.Screen component={Agenda} name={'Agenda'} />
        <Stack.Screen component={PantherProduct} name={'PantherProduct'} />
        <Stack.Screen component={SaveOurSouls} name={'SaveOurSouls'} />
        <Stack.Screen component={EditUserProfile} name={'EditUserProfile'} />
        <Stack.Screen component={ScanQR} name={'ScanQR'} />
        <Stack.Screen component={QRSignIn} name={'QRSignIn'} />
        <Stack.Screen
          component={SqaanQrUserDetails}
          name={'SqanQrUserDetails'}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
