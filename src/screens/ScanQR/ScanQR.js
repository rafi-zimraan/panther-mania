import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import {colors} from '../../utils/constant';
import * as Animatable from 'react-native-animatable';
import {useDispatch} from 'react-redux';
import {signQrCode} from '../../features/Auth/services/signQrCode';
import {useSelector} from 'react-redux';
import {SetQrLoading} from '../../redux/slices/authSlice';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function ScanQR({navigation}) {
  const dispatch = useDispatch();
  const {qr_loading} = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [animationDuration, setAnimasionDuration] = useState(3000);
  const [isCameraAuthorized, setIsCameraAuthorized] = useState(false);
  const check_permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsCameraAuthorized(true);
        setAnimasionDuration(3000);
      }
    } catch (error) {
      console.log('Error Chaking camera', error);
    }
  };

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      check_permission();
      dispatch(SetQrLoading(false));
    });
    return refresh;
  }, [navigation]);

  function handleSignWithQrCode(rfid) {
    dispatch(SetQrLoading(true));
    console.log('Signing in with QR code:', rfid);
    dispatch(signQrCode({rfid, navigation}));

    // Setelah pemindaian QR code selesai, kembalikan ke tampilan awal
    dispatch(SetQrLoading(false));
  }

  // Menampilkan loading indicator jika isLoading adalah true
  if (!isCameraAuthorized) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar
          barStyle={'dark-content'}
          translucent={true}
          backgroundColor="transparent"
        />
        <Text style={styles.loadingText}>Memuat...</Text>
      </View>
    );
  }

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />

      <QRCodeScanner
        onRead={event => handleSignWithQrCode(event.data)}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go for <Text style={styles.textBold}>Login Panther Mania </Text>
            from scan the QR code.
          </Text>
        }
      />

      <Animatable.View
        style={styles.qrScannBox}
        animation="pulse" // Anda dapat memilih animasi yang sesuai
        easing="linear"
        iterationCount="infinite"
        duration={animationDuration}
      />

      <View style={styles.qrScannBox} />
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  Container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  ContentModal: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  HeaderModal: {
    justifyContent: 'center',
  },
  AboutData: {
    textAlign: 'auto',
    color: colors.black,
    margin: 7,
  },
  TextWarning: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  txtDesciption: {
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  TextClose: {
    color: '#000',
    fontSize: 30,
  },
  qrScannBox: {
    position: 'absolute',
    top: '30%', // Sesuaikan dengan posisi yang Anda inginkan
    left: '10%', // Sesuaikan dengan posisi yang Anda inginkan
    width: '80%',
    height: '40%',
    borderWidth: 2,
    borderColor: colors.white,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.primary,
  },
});
