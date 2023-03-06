import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  navigate,
  navigateAndSimpleReset,
  navigateGoBack,
} from '../../utils/navigators';
import {useRoute} from '@react-navigation/native';
import {fonts, images} from '../../assets';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import {colors, wait} from '../../utils';
import AlertMessage from '../../components/AlertMessage';
import {Button} from 'react-native-paper';
import {rfidGetConsume, rfidPostConsume} from '../../services/RfidConsume';
import Loader from '../../components/Loader';
import jsonStringify from '../../utils/jsonStringify';
import {SignInApi} from '../../services/SignInConsume';

const QrScanner = () => {
  const route = useRoute();
  const [torch, setTorch] = useState(false);
  const [isVisibleModalMessage, setIsVisibleModalMessage] = useState(false);
  const [isModalMessage, setIsModalMessage] = useState(true);
  const [isMessage, setIsMessage] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    console.log(torch);
  }, [torch]);

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

  const onSuccess = async e => {
    if (route.params.fromScreen === 'OnBoardingTwo') {
      const responseRFID = await rfidGetConsume(e.data);
      const {status} = responseRFID;

      console.log('====================================');
      console.log(jsonStringify(responseRFID));
      console.log('====================================');

      if (status !== 'success') {
        // this code show pop up when process consume API failed
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage('RFID yang anda masukan tidak terdaftar');
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
          navigateAndSimpleReset('OnBoardingTwo');
        });
      } else {
        setIsLoader(true);
        try {
          const formData = new FormData();
          formData.append('email', responseRFID.data.email);
          formData.append('password', responseRFID.data.password);

          const response = await SignInApi(formData);
          const {data} = response;

          if (data !== 'berhasil login!') {
            // this code show pop up when data from API not success
            setIsLoader(false);
            setIsLoadingLogin(false);
            setEnableError(true);
            return response;
          }

          // set token if success consume api
          let token = response.access_token;
          AsyncStorage.setItem('token', token);
          let profileId = response.API.id;
          AsyncStorage.setItem('profileId', profileId.toString());

          navigateAndSimpleReset('Home');
        } catch (error) {
          // this code show pop up when process consume API failed
          setIsVisibleModalMessage(true);
          setIsModalMessage(false);
          setIsMessage(
            `Terjadi kesalahan di ${error.message}, silahkan coba lagi`,
          );
          wait(5000).then(() => {
            setIsVisibleModalMessage(false);
            navigateAndSimpleReset('OnBoardingTwo');
          });
        }
        setIsLoader(false);
      }
    } else if (route.params.fromScreen === 'Register') {
      AsyncStorage.setItem('rfid', e.data);
      navigateAndSimpleReset('Register');
    } else if (route.params.fromScreen === 'Home') {
      try {
        const response = await rfidGetConsume(e.data);
        const {status} = response;

        if (status !== 'success') {
          setIsVisibleModalMessage(true);
          setIsModalMessage(false);
          setIsMessage('RFID yang anda masukan tidak terdaftar');
          wait(5000).then(() => {
            setIsVisibleModalMessage(false);
            navigateAndSimpleReset('Home');
          });
        } else {
          navigate('Maps', {
            fromScreen: 'Home',
          });
        }
      } catch (error) {
        // this code show pop up when process consume API failed
        setIsVisibleModalMessage(true);
        setIsModalMessage(false);
        setIsMessage(
          `Terjadi kesalahan di ${error.message}, silahkan coba lagi`,
        );
        wait(5000).then(() => {
          setIsVisibleModalMessage(false);
          navigateAndSimpleReset('Home');
        });
      }
    }
  };

  const renderLoader = () => {
    return <Loader isVisible={isLoader} />;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={
          torch
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        topContent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={images.logopanthermania}
              style={{
                width: WIDTH * 0.6,
                height: HEIGHT * 0.09,
                marginBottom: HEIGHT * 0.07,
              }}
            />
          </View>
        }
        bottomContent={
          //     <TouchableOpacity style={styles.buttonTouchable} onPress={() => setTorch(!torch)}>
          //     <Text style={styles.buttonText}>{torch ? "Matikan senter" : "Aktifkan senter"}</Text>
          //   </TouchableOpacity>

          <Button
            icon="flashlight"
            mode="contained"
            onPress={() => setTorch(!torch)}
            color={colors.darkGreyBlue}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: HEIGHT * 0.2,
              marginTop: HEIGHT * 0.1,
              padding: HEIGHT * 0.02,
            }}>
            {torch ? 'Matikan senter' : 'Nyalakan senter'}
          </Button>
        }
      />
      {renderPopUpMessage()}
      {renderLoader()}
    </SafeAreaView>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
