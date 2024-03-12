import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ToastAndroid,
  PermissionsAndroid,
  Text,
} from 'react-native';

import {colors} from '../../utils/constant';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import ModalUserDetailQR from '../../features/SqanQr/ModalUserDetailQR';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function SqaanQrUserDetails() {
  const dispatch = useDispatch();
  const {qr_loading, token} = useSelector(state => state.auth);
  const [animationDuration, setAnimationDuration] = useState(3000);
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState({
    user_id: null,
    photo_profile: '',
    nama_lengkap: '',
    no_whatsapp: '',
    alamat: '',
    email: '',
  });

  const check_permission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setAnimationDuration(3000);
    }
  };

  useEffect(() => {
    check_permission();
  }, []);

  const handleScanQR = nomor => {
    console.log('Scan BarCode User:', nomor);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append('nomor', nomor);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://panther-mania.id/api/v1/show_profile', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setUserData(result.data);
        setModal(true);
      })
      .catch(error => {
        console.log('error masbro..', error);
        ToastAndroid.show(error?.message, ToastAndroid.LONG);
      });
  };

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />

      <QRCodeScanner
        onRead={event => handleScanQR(event.data)}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go for{' '}
            <Text style={styles.textBold}>Search Member Panther Mania </Text>
            from scan the QR code.
          </Text>
        }
      />

      <Animatable.View
        style={styles.qrScannBox}
        animation="pulse"
        easing="linear"
        iterationCount="infinite"
        duration={animationDuration}
      />

      <View style={styles.qrScannBox} />
      <ModalUserDetailQR data={userData} visible={modal} />
    </View>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 20,
    color: '#777',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  errorModalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorModalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorButton: {
    color: '#FFF',
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
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
  txtDescription: {
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
    top: '30%',
    left: '10%',
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
