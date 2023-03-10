import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {ImgBgPlain, ImgPMCar} from '../../assets';
import useOrientation from '../../utils/useOrientation';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import {Gap} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignIn} from '../../features/Auth/services/signInServices';

export default function SignIn({navigation}) {
  const dispatch = useDispatch();
  const {status_signin: status} = useSelector(state => state.auth);
  const {width, height} = useOrientation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const disableButton =
    email == '' ||
    !email.includes('@') ||
    !email.includes('.') ||
    password == '' ||
    status == 'pending';

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Image
          source={ImgBgPlain}
          style={{width, height, position: 'absolute'}}
        />
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
        <Gap height={15} />
        <FormInput
          placeholder="Kata Sandi"
          password
          iconOverride={'lock'}
          onChangeText={setPassword}
        />
        <Gap height={15} />
        <ButtonSubmit
          title="MASUK"
          disabled={disableButton}
          loading={status == 'pending'}
          onPress={() => dispatch(fetchSignIn({email, password, navigation}))}
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
