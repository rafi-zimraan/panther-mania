import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts, images} from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CarPantherMania from '../../components/CarPantherMania';
import {HEIGHT, WIDTH} from '../../utils/dimension';

const wait = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const Splash = ({navigation, route}) => {
  const handleMoveScreen = async () => {
    const nextClick = await AsyncStorage.getItem('nextClick');
    console.log(`NEXT CLICKED : ${JSON.stringify(nextClick)}`);
    const token = await AsyncStorage.getItem('token');
    console.log(`TOKEN ${token}`);
    wait(5000).then(() => {
      if (token !== null) {
        navigation.replace('Home');
      } else {
        if (nextClick === 'next_clicked') {
          navigation.replace('OnBoardingTwo');
        } else {
          navigation.replace('OnBoarding');
        }
      }
    });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      handleMoveScreen();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={images.defaultbackground} style={styles.logo} />
      <CarPantherMania
        styleWrapperLogoPantherAndCar={{
          position: 'absolute',
          top: HEIGHT * 0.12,
        }}
        styleImageCar={{
          width: WIDTH * 0.9,
          height: HEIGHT * 0.4,
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontFamily: fonts.BebasNeueRegular,
    fontSize: dimens.xxl,
    color: colors.white,
  },
});
export default Splash;
