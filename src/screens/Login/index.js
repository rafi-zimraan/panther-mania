import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import {fonts, images} from '../../assets';
import {Header} from '../../components/Header';
import {CustomTextInput} from '../../components/CustomTextInput';
import {ButtonCustom} from '../../components';
import CarPantherMania from '../../components/CarPantherMania';
import {colors, wait} from '../../utils';
import {SignInApi} from '../../services/SignInConsume';
import AlertMessage from '../../components/AlertMessage';
import jsonStringify from '../../utils/jsonStringify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/Loader';
import {
  navigate,
  navigateAndSimpleReset,
  navigateGoBack,
} from '../../utils/navigators';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [enableError, setEnableError] = useState(false);

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
  
  useEffect(() => {}, [email, password]);

  const memoVisiblePassword = useMemo(() => {
    if (isVisiblePassword) {
      return true;
    } else {
      return false;
    }
  }, [isVisiblePassword]);

  // this code for consume api from Login
  const SignInConsume = async () => {
    setIsLoader(true);
    setIsLoadingLogin(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await SignInApi(formData);
      const {data} = response;
      console.log(`API LOGIN ${jsonStringify(response)}`);
      if (data !== 'berhasil login!') {
        // this code show pop up when data from API not success
        setIsLoader(false);
        setIsLoadingLogin(false);
        setEnableError(true);
        return response;
      }

      // this code show pop up when data from API success
      setIsVisibleModalMessage(true);
      setIsModalMessage(true);
      setIsMessage('Berhasil masuk');

      // set token if success consume api
      let token = response.access_token;
      AsyncStorage.setItem('token', token);
      let profileId = response.API.id;
      AsyncStorage.setItem('profileId', profileId.toString());

      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
        navigateAndSimpleReset('Home');
      });
    } catch (error) {
      // this code show pop up when process consume API failed
      setIsVisibleModalMessage(true);
      setIsModalMessage(false);
      setIsMessage(`Terjadi kesalahan di ${error.message}, silahkan coba lagi`);
      wait(5000).then(() => {
        setIsVisibleModalMessage(false);
      });
    }
    setIsLoadingLogin(false);
    setIsLoader(false);
  };

  const renderViewImageBackground = () => {
    return (
      <Image
        source={images.emptybackground}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: HEIGHT,
        }}
      />
    );
  };

  const renderViewHeader = () => {
    return <Header BackPress={() => navigateGoBack()} />;
  };

  const renderViewTextInput = () => {
    return (
      <View
        style={{
          top: HEIGHT * -0.1,
        }}>
        <CustomTextInput
          nameIconLeft="email"
          colorIconLeft={colors.white}
          sizeIconLeft={HEIGHT * 0.03}
          placeholder="Email"
          placeholderTextColor={colors.aluminium}
          styleWrapperIconLeftTextIconRight={styles.styleTextInput}
          onChangeText={text => setEmail(text)}
        />

        <CustomTextInput
          nameIconLeft="password"
          colorIconLeft={colors.white}
          sizeIconLeft={HEIGHT * 0.03}
          placeholder="Password"
          buttonRightEnable={true}
          colorButtonRightPress={colors.darkGreyBlue}
          buttonRightPress={() => setIsVisiblePassword(!isVisiblePassword)}
          iconNameRight={isVisiblePassword ? 'eye-off' : 'eye'}
          iconColorRight={colors.white}
          secureTextEntry={memoVisiblePassword}
          placeholderTextColor={colors.aluminium}
          styleWrapperIconLeftTextIconRight={styles.styleTextInput}
          onChangeText={text => setPassword(text)}
        />

        {enableError && (
          <Text style={styles.textError}>
            Email dan password yang anda masukan belum terdaftar silahkan
            registrasi terlebih dahulu
          </Text>
        )}
      </View>
    );
  };

  const renderViewButtonLogin = () => {
    return (
      <ButtonCustom
        color={isLoadingLogin ? colors.gray : colors.elephant}
        title="Login"
        disabled={isLoadingLogin}
        buttonStyle={styles.styleButtonLogin}
        textStyle={styles.styleTextButtonLogin}
        onPress={SignInConsume}
      />
    );
  };

  const renderLoader = () => {
    return <Loader isVisible={isLoader} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderViewImageBackground()}
      {renderViewHeader()}
      <ScrollView>
        <CarPantherMania
          styleWrapperLogoPantherAndCar={styles.logoimagepanther}
        />
        {renderViewTextInput()}
        {renderViewButtonLogin()}
      </ScrollView>
      {renderPopUpMessage()}
      {renderLoader()}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoimagepanther: {
    alignSelf: 'center',
    top: HEIGHT * -0.1,
  },
  wrapperButton: {
    position: 'absolute',
    bottom: HEIGHT * 0.12,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: WIDTH * 0.6,
    height: HEIGHT * 0.06,
    borderRadius: 25,
    justifyContent: 'center',
    borderColor: colors.white,
    borderWidth: 1,
    marginVertical: 3,
  },
  styleTextInput: {
    borderColor: colors.hippieBlue,
    borderWidth: 1,
  },
  styleButtonLogin: {
    top: HEIGHT * -0.085,
    width: WIDTH * 0.7,
    height: HEIGHT * 0.07,
    alignSelf: 'center',
    borderTopLeftRadius: WIDTH * 0.07,
    borderTopRightRadius: WIDTH * 0.07,
    borderBottomLeftRadius: WIDTH * 0.07,
    borderBottomRightRadius: WIDTH * 0.07,
  },
  styleTextButtonLogin: {
    fontSize: HEIGHT * 0.08,
    fontFamily: fonts.BebasNeueRegular,
  },
  textError: {
    color: colors.reddish,
    fontFamily: fonts.BebasNeueRegular,
    fontSize: HEIGHT * 0.015,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    width: WIDTH * 0.8,
  },
});
