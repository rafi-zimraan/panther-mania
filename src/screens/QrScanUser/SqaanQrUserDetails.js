import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  Linking,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  useCameraDevice,
  Camera,
  useCodeScanner,
  useCameraPermission,
} from 'react-native-vision-camera';
import {colors} from '../../utils/constant';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {SetQrLoading} from '../../redux/slices/authSlice';
import ModalUserDetailQR from '../../features/SqanQr/ModalUserDetailQR';

export default function SqaanQrUserDetails() {
  const dispatch = useDispatch();
  const {qr_loading, token} = useSelector(state => state.auth);
  const [animationDuration, setAnimationDuration] = useState(3000);
  const [errorOccured, setErrorOccured] = useState(false);
  const device = useCameraDevice('back');
  const [modal, setModal] = useState(false);
  const [stateCamera, setStateCamera] = useState(true);
  const [userData, setUserData] = useState({
    user_id: null,
    photo_profile: '',
    nama_lengkap: '',
    no_whatsapp: '',
    alamat: '',
    email: '',
  });

  const check_permission = async () => {
    try {
      let permission = await Camera.getCameraPermissionStatus();

      if (permission === 'granted') {
        setAnimationDuration(100);
      } else {
        setAnimationDuration(3000);
        requestCameraPermission();
      }
    } catch (error) {
      console.error('Error checking camera permission:', error);
      setErrorOccured(true);
    }
  };

  const requestCameraPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      // Izin kamera diberikan, lakukan tindakan yang diperlukan
      setErrorOccured(false);
    } else {
      // Izin kamera tidak diberikan, Anda bisa menampilkan pesan tambahan atau menangani dengan cara lain
      Alert.alert(
        'Izin kamera tidak diberikan',
        'Anda perlu memberikan izin kamera untuk menggunakan fitur ini.',
      );
    }
  };

  const {hasPermission, requestPermission} = useCameraPermission();
  console.log('Has camera permission:', hasPermission);

  useEffect(() => {
    check_permission();
  }, []);

  // ! Untuk Navigate ke setting user
  const OpenSettings = async () => {
    try {
      // Membuka pengaturan aplikasi
      await Linking.openSettings();
    } catch (err) {
      Alert.alert('Tidak dapat membuka pengaturan', [
        {
          text: 'ok',
        },
      ]);
      console.error('Tidak dapat membuka pengaturan:', err);
    }
  };

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

  // function handleScanWithQrCode(nomor) {
  //   dispatch(SetQrLoading(true));
  //   handleScanQR(nomor);
  // }

  //! Scanner
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      console.log(codes);
      setStateCamera(false);
      if (codes[0].value.includes('PM')) {
        handleScanQR(codes[0].value);
      } else {
        setStateCamera(true);
        ToastAndroid.show('QRCode Tidak di kenali', ToastAndroid.LONG);
      }
    },
  });

  // ! Ketika Error Permission
  // if (errorOccured) {
  //   return (
  //     <Modal
  //       transparent={true}
  //       isVisible={errorOccured}
  //       backdropColor={'#FFF'}
  //       backdropOpacity={0.8}
  //       animationIn="zoomInDown"
  //       animationOut="zoomOutUp"
  //       animationInTiming={2000}
  //       animationOutTiming={2000}
  //       backdropTransitionInTiming={1000}
  //       backdropTransitionOutTiming={1000}>
  //       <View style={styles.errorModalContainer}>
  //         <Image
  //           source={require('../../assets/icons/silang.png')}
  //           style={{
  //             width: 60,
  //             height: 60,
  //           }}
  //         />
  //         <Text style={styles.errorText}>
  //           Terjadi kesalahan saat memeriksa izin kamera.
  //         </Text>
  //         <TouchableOpacity onPress={OpenSettings}>
  //           <Text style={styles.errorButton}>Coba Lagi</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Modal>
  //   );
  // }

  // Menampilkan loading indicator jika isLoading adalah true
  // if (qr_loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <StatusBar
  //         barStyle={'dark-content'}
  //         translucent={true}
  //         backgroundColor="transparent"
  //       />
  //       <ActivityIndicator size="large" color={colors.primary} />
  //       <Text style={styles.loadingText}>Memuat...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.Container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={stateCamera}
        codeScanner={codeScanner}
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
