import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import {ImgBgOnBoarding, ImgPMCar} from '../../assets';
import useOrientation from '../../utils/useOrientation';
import {Gap} from '../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function OnBoarding({navigation}) {
  const {width, height} = useOrientation();

  async function handleNavigate() {
    await EncryptedStorage.setItem('first_init', 'initialized');
    navigation.replace('AuthMethod');
  }

  return (
    <View style={styles.container}>
      <Image
        source={ImgBgOnBoarding}
        style={{width, height, position: 'absolute'}}
      />
      <Image source={ImgPMCar} style={styles.imgPMCar} />
      <View style={styles.viewIntroContainer}>
        <Text style={styles.textIntro}>Selamat Datang di Panther Mania</Text>
        <Gap height={20} />
        <Text style={styles.textSubIntro}>
          Aplikasi ini adalah aplikasi Komunitas Panther Mania di seluruh
          Indonesia. Bangun Komunitas Panther Mania dan Bergabunglah Bersama
          Kami!
        </Text>
      </View>
      <TouchableNativeFeedback
        useForeground
        background={TouchableNativeFeedback.Ripple('white')}
        onPress={handleNavigate}>
        <View style={styles.btnNext}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Lanjut</Text>
          <Icon name="chevron-right" color={'white'} size={30} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  btnNext: {
    position: 'absolute',
    bottom: 25,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    overflow: 'hidden',
    borderRadius: 15,
  },
  imgPMCar: {
    alignSelf: 'center',
    top: '20%',
  },
  textSubIntro: {
    textAlign: 'center',
    color: 'white',
  },
  textIntro: {
    color: 'white',
    fontSize: 19,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  viewIntroContainer: {
    position: 'absolute',
    bottom: '12.5%',
    alignSelf: 'center',
    width: '90%',
    maxWidth: 450,
  },
  container: {
    flex: 1,
  },
});
