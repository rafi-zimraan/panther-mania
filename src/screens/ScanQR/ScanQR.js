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
import {useDispatch} from 'react-redux';
import {signQrCode} from '../../features/Auth/services/signQrCode';
import {useSelector} from 'react-redux';
import {SetQrLoading} from '../../redux/slices/authSlice';

export default function ScanQR({navigation}) {
  const dispatch = useDispatch();
  const {qr_loading} = useSelector(state => state.auth);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [animationDuration, setAnimasionDuration] = useState(3000);
  const [errorOccured, setErrorOccured] = useState(false);
  const device = useCameraDevice('back');

  const check_permission = async () => {
    try {
      let permission = await Camera.getCameraPermissionStatus();

      if (permission === 'granted') {
        setIsModalVisible(false);
        setAnimasionDuration(100);
      } else {
        setAnimasionDuration(3000);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error checking camera permission:', error);
      setErrorOccured(true);
    }
  };

  const {hasPermission, requestPermission} = useCameraPermission();
  console.log('Has camera permission:', hasPermission);

  const CloseModal = () => {
    setIsModalVisible(false);
  };

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

  function handleSignWithQrCode(rfid) {
    dispatch(SetQrLoading(true));
    setIsLoading(true);
    console.log('Signing in with QR code:', rfid);
    dispatch(signQrCode({rfid, navigation}));

    // Setelah pemindaian QR code selesai, kembalikan ke tampilan awal
    setIsLoading(false);
    setIsModalVisible(true);
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (codes.length >= 1 && codes[0].value) {
        console.log('QR code scanned:', codes[0].value);
        handleSignWithQrCode(codes[0].value);
      }
    },
  });

  // Menampilkan loading indicator jika isLoading adalah true
  if (qr_loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar
          barStyle={'dark-content'}
          translucent={true}
          backgroundColor="transparent"
        />
        <ActivityIndicator size="large" color={colors.primary} />
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

      {/* MODAL PERMISSION CAMERA */}
      <Modal
        transparent={true}
        isVisible={isModalVisible}
        backdropColor={'#FFF'}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={2000}
        animationOutTiming={2000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}>
        <View style={styles.ContentModal}>
          {/* input utama */}
          <View style={styles.HeaderModal}>
            <Image
              source={require('../../assets/icons/silang.png')}
              style={{
                width: 60,
                height: 60,
              }}
            />
            <Text style={styles.TextWarning}>Peringatan!,</Text>
            <Text style={styles.txtDesciption}>
              Silahkan check permission camera anda
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={OpenSettings}>
                <Text style={styles.AboutData}>Ok</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={CloseModal}>
                <Text style={styles.AboutData}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
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
