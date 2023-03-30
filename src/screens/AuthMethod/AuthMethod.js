import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React from 'react';
import {ImgBGDefault, ImgPMCar} from '../../assets';
import useOrientation from '../../utils/useOrientation';
import {ButtonAuthMethod} from '../../features/Auth';
import {Gap} from '../../components';
export default function AuthMethod({navigation}) {
  const {width, height} = useOrientation();

  return (
    <View style={styles.container}>
      <Image
        source={ImgBGDefault}
        style={{width, height, position: 'absolute'}}
      />
      <Image source={ImgPMCar} />
      <ButtonAuthMethod
        title="SCAN ID"
        onPress={() =>
          Alert.alert(
            'Fitur sedang dalam pengembangan',
            'Nantikan fitur terbaru dari kami, ya!',
          )
        }
      />
      <Gap height={20} />
      <ButtonAuthMethod
        title="MASUK"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Gap height={20} />
      <ButtonAuthMethod
        title="DAFTAR"
        onPress={() => navigation.navigate('SignUp')}
      />
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
