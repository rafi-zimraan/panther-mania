import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import {ImgBgPlain, ImgPMCar} from '../../assets';
import useOrientation from '../../utils/useOrientation';
import {FormInput} from '../../features/Auth';
import {Gap} from '../../components';

export default function SignIn() {
  const {width, height} = useOrientation();
  return (
    <View style={styles.container}>
      <Image
        source={ImgBgPlain}
        style={{width, height, position: 'absolute'}}
      />
      <Image source={ImgPMCar} />
      <FormInput placeholder="contoh@email.com" />
      <Gap height={15} />
      <FormInput placeholder="Kata Sandi" password iconName="lock" />
      <Gap height={15} />
      <TouchableNativeFeedback>
        <View>
          <Text>Masuk</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
