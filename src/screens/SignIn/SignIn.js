import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {ImgPMCar} from '../../assets';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import {BackgroundImage, Gap, Header} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignIn} from '../../features/Auth/services/signInServices';
import {useLocation} from '../../hooks';
import {useForm} from 'react-hook-form';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();
  const {status_signin: status} = useSelector(state => state.auth);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();
  const {longitude: lng, latitude: lat} = useLocation();

  function handleSignIn(formData) {
    dispatch(fetchSignIn({...formData, navigation, lat, lng}));
  }
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
          name={'email'}
          placeholder={'contoh@gmail.com'}
          iconName={'gmail'}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          errors={errors}
          control={control}
        />
        <FormInput
          name={'password'}
          placeholder={'Kata sandi..'}
          iconName={'lock'}
          secureTextEntry
          errors={errors}
          control={control}
        />
        <Gap height={20} />
        <ButtonSubmit
          title="MASUK"
          disabled={status == 'pending'}
          loading={status == 'pending'}
          onPress={handleSubmit(handleSignIn)}
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
