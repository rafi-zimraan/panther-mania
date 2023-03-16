import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {ImgBGDefault, ImgPMCar} from '../../assets';
import useOrientation from '../../utils/useOrientation';
import {ButtonAuthMethod} from '../../features/Auth';
import {Gap} from '../../components';
import {useSelector} from 'react-redux';

export default function AuthMethod({navigation}) {
  const {auth} = useSelector(state => state);
  const {width, height} = useOrientation();
  // console.log(auth.status_signup);

  return (
    <View style={styles.container}>
      <Image
        source={ImgBGDefault}
        style={{width, height, position: 'absolute'}}
      />
      <Image source={ImgPMCar} />
      <ButtonAuthMethod title="SCAN ID" onPress={() => Alert.alert('Fitur sedang dalam pengembangan', 'Nantikan fitur terbaru dari kami, ya!')} />
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
