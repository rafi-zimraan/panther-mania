import {Button, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ImgBGDefault, ImgPMCar} from '../../assets';
import useOrientation from '../../utils/useOrientation';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function Splash({navigation}) {
  const {height, width} = useOrientation();

  useEffect(() => {
    refreshSession();
  }, []);

  async function refreshSession() {
    const credential = await EncryptedStorage.getItem('user_credential');
    if (credential) {
      const {email, password} = JSON.parse(credential);
      navigation.replace('Home');
    } else {
      const firstInit = await EncryptedStorage.getItem('first_init');
      setTimeout(() => {
        firstInit
          ? navigation.replace('AuthMethod')
          : navigation.replace('OnBoarding');
      }, 2000);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={ImgBGDefault}
        style={{width, height, position: 'absolute'}}
      />
      <Image source={ImgPMCar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
