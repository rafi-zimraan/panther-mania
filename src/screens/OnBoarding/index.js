import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {fonts, images} from '../../assets';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CarPantherMania from '../../components/CarPantherMania';
import {colors} from '../../utils';
import {ButtonCustom} from '../../components';
import AlertMessage from '../../components/AlertMessage';
import {navigate, navigateAndSimpleReset} from '../../utils/navigators';
import {Header} from '../../components/Header';
import jsonStringify from '../../utils/jsonStringify';

export const OnBoarding = () => {
  // const [orientation, setOrientation] = useState({
  //   width: WIDTH,
  //   height: HEIGHT,
  // });

  // console.log(orientation);

  // This code for behavior change orientation
  // passing width and height to setOrientation
  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener('change', e => {
  //     const {width, height} = Platform.OS === 'ios' ? e.window : e.screen;
  //     setOrientation({width, height});
  //   });

  //   return () => subscription;
  // }, []);

  const handleNextClick = () => {
    AsyncStorage.setItem('nextClick', 'next_clicked');
    navigateAndSimpleReset('OnBoardingTwo');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.onboardingbackground2}
        style={styles.backgroundImage}>
        <CarPantherMania />

        <View style={styles.wrapperTitleWelcomeBackAndTheContent}>
          <Text style={styles.titleWelcomeBack}>Welcome To Panther Mania</Text>

          <Text style={styles.contentPantherMania}>
            Aplikasi ini adalah aplikasi Komunitas Panther Mania di seluruh
            Indonesia . Bangun Komunitas Panther Mania dan Bergabunglah Bersama
            Kami...
          </Text>
        </View>

        <TouchableOpacity style={styles.nextStep} onPress={handleNextClick}>
          <Text style={styles.textNextStep}>Next</Text>
          <Icon
            name="chevron-right"
            size={HEIGHT * 0.029}
            color={colors.white}
          />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export const OnBoardingTwo = () => {
  // const [orientation, setOrientation] = useState({
  //   width: WIDTH,
  //   height: HEIGHT,
  // });
  const [isVisiblePermission, setIsVisiblePermission] = useState(false);
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  // console.log(orientation);
  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener('change', e => {
  //     const {width, height} = Platform.OS === 'ios' ? e.window : e.screen;
  //     setOrientation({width, height});
  //   });

  // This code for behavior change orientation
  // passing width and height to setOrientation
  //   return () => subscription;
  // }, []);

    // Pop Up Message
    const renderPopUpMessage = () => {
      return (
        <AlertMessage
          styleTitleContent={{
            textShadowColor: colors.black,
            textShadowOffset: {
              width: 2,
              height: 5,
            },
            textShadowRadius: 18,
          }}
          type={isModalMessage ? 'success' : 'failed'}
          titleContent={isMessage}
          visible={isVisibleModalMessage}
          dismissable={false}
          enableClose={false}
          enableSubmit={false}
        />
      );
    };

  useEffect(() => {
    _checkPermissionLocation()
  }, [])


  const _checkPermissionLocation = async () => {
    try {
      const resultPermissionLocation = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      const resultPermissionCamera = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      console.log(`RESULT PERMISSION LOCATION ${resultPermissionLocation}`);
      console.log(`RESULT PERMISSION CAMERA ${resultPermissionCamera}`);

      // Check result check permission
      // if true will be move to screen Maps
      // but if false will be request permission again
      if (
        resultPermissionLocation === true &&
        resultPermissionCamera === true
      ) {
        return true
      } else {
        const status = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ]);

        console.log(`STATUS ${jsonStringify(status)}`);

        if (
          status['android.permission.CAMERA'] === 'never_ask_again' ||
          status['android.permission.ACCESS_FINE_LOCATION'] ===
            'never_ask_again'
        ) {
          setIsVisiblePermission(true);
        } else if (
          status['android.permission.CAMERA'] === 'denied' ||
          status['android.permission.ACCESS_FINE_LOCATION'] === 'denied'
        ) {
          _checkPermissionLocation();
        } else if (
          status['android.permission.CAMERA'] === 'granted' &&
          status['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
        ) {
          return true
        }
      }
    } catch (error) {
      console.log('ERROR PERMISSION LOCATION : ' + error.message);
    }
  };

  const memoIsVisiblePermission = useMemo(() => {
    if (isVisiblePermission) {
      console.log(`ISVISIBLEPERMISSION ${true}`);
      return true;
    }

    console.log(`ISVISIBLEPERMISSION ${false}`);
    return false;
  }, [isVisiblePermission]);

  const renderAlertMessagePermission = () => {
    return (
      <AlertMessage
        visible={memoIsVisiblePermission}
        enableClose={false}
        type="setting"
        titleContent="Peringatan! untuk menggunakan aplikasi Panther Mania diwajibkan untuk mengaktifkan izin pengambilan lokasi dan kamera"
        textButton="Buka Pengaturan"
        onSubmit={() => {
          Linking.openSettings();
          setIsVisiblePermission(false);
        }}
        styleTitleContent={{
          color: colors.gray,
        }}
        styleButton={{
          width: WIDTH * 0.6,
        }}
        styleWrapper={{
          backgroundColor: colors.white,
        }}
      />
    );
  };

  // const QrConsume = async () => {
    

  // }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.defaultbackground}
        style={{width: '100%', height: '100%'}}>
        <CarPantherMania
          styleWrapperLogoPantherAndCar={{
            marginTop: HEIGHT * 0.18,
          }}
          styleImageCar={{
            width: WIDTH * 0.9,
            height: HEIGHT * 0.4,
          }}
        />
        <View style={styles.wrapperButton}>
        <ButtonCustom
            color={colors.elephant}
            title="SCAN ID"
            buttonStyle={styles.styleButtonLogin}
            textStyle={styles.styleTextButtonLogin}
            onPress={() => navigate('QrScanner', {
              fromScreen: 'OnBoardingTwo'
            })}
          />

          <ButtonCustom
            color={colors.elephant}
            title="Login"
            buttonStyle={styles.styleButtonLogin}
            textStyle={styles.styleTextButtonLogin}
            onPress={() => navigate('Login')}
          />

          <ButtonCustom
            color={colors.darkGreyBlue}
            title="Register"
            buttonStyle={styles.styleButtonLogin}
            textStyle={styles.styleTextButtonLogin}
            onPress={() => navigate("Register")}
          />
        </View>
        {renderAlertMessagePermission()}
        {renderPopUpMessage()}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleHeader: {
    marginTop: HEIGHT * 0.2,
  },
  wrapperTitleWelcomeBackAndTheContent: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HEIGHT * 0.2,
    width: WIDTH * 0.9,
  },
  titleWelcomeBack: {
    letterSpacing: 0.5,
    fontSize: HEIGHT * 0.028,
    color: colors.white,
    fontWeight: '800',
    fontFamily: fonts.BebasNeueRegular,
  },
  contentPantherMania: {
    marginTop: HEIGHT * 0.02,
    fontSize: HEIGHT * 0.017,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.BebasNeueRegular,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  nextStep: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: HEIGHT * 0.05,
    right: WIDTH * 0.06,
  },
  textNextStep: {
    color: colors.white,
    fontSize: HEIGHT * 0.025,
    marginRight: 5,
    fontFamily: fonts.BebasNeueRegular,
  },

  // Style for OnBoardingTwo
  wrapperButton: {
    position: 'absolute',
    bottom: HEIGHT * 0.12,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleButtonLogin: {
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: HEIGHT * 0.01,
    width: WIDTH * 0.6,
    height: HEIGHT * 0.06,
    alignSelf: 'center',
    borderTopLeftRadius: WIDTH * 0.07,
    borderTopRightRadius: WIDTH * 0.07,
    borderBottomLeftRadius: WIDTH * 0.07,
    borderBottomRightRadius: WIDTH * 0.07,
  },
  styleTextButtonLogin: {
    fontSize: HEIGHT * 0.028,
    fontFamily: fonts.BebasNeueRegular,
  },
});
