import {StyleSheet, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ImgPMCar} from '../../assets';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import {BackgroundImage, Gap, Header} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignIn} from '../../features/Auth/services/signInServices';
import useLocation from '../../hooks/useLocation';
import usePermission from '../../hooks/usePermission';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();
  const {status_signin: status} = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {location, getCurrentLocation} = useLocation();

  const disableButton =
    email == '' ||
    !email.includes('@') ||
    !email.includes('.') ||
    password == '' ||
    status == 'pending';

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <Header title="Masuk" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Image
          source={ImgPMCar}
          style={{position: 'absolute', opacity: 0.25}}
        />
        <FormInput
          placeholder="contoh@email.com"
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          onChangeText={setEmail}
        />
        <FormInput
          placeholder="Kata Sandi"
          password
          iconOverride={'lock'}
          onChangeText={setPassword}
        />
        <Gap height={20} />
        <ButtonSubmit
          title="MASUK"
          disabled={disableButton}
          loading={status == 'pending'}
          onPress={() => {
            const formData = {
              email,
              password,
              navigation,
              lat: location.latitude,
              lng: location.longitude,
            };
            dispatch(fetchSignIn(formData));
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
});
