// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   StatusBar,
//   Linking,
// } from 'react-native';
// import {
//   useCameraDevice,
//   Camera,
//   useCodeScanner,
//   useCameraPermission,
// } from 'react-native-vision-camera';
// import {colors} from '../../utils/constant';
// import Modal from 'react-native-modal';
// import * as Animatable from 'react-native-animatable';

// export default function ScanQR() {
//   const [isModalVisible, setIsModalVisible] = useState(true);
//   const [animationDuration, setAnimasionDuration] = useState(3000);
//   const device = useCameraDevice('back');

//   const check_permission = async () => {
//     let permission = await Camera.getCameraPermissionStatus();
//     console.log(permission);

//     // validasi izin kamera di sini  dan sesuaikan animasi berdasarkan izin
//     if (permission === 'authorized') {
//       setAnimasionDuration(100);
//     } else {
//       setAnimasionDuration(3000);
//       setIsModalVisible(true);
//     }
//   };

//   const {hasPermission, requestPermission} = useCameraPermission();
//   console.log(hasPermission);

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: codes => {
//       console.log(codes[0].value);
//     },
//   });

//   const CloseModal = () => {
//     setIsModalVisible(false);
//   };

//   useEffect(() => {
//     check_permission();
//   }, []);

//   // ! Untuk Navigate ke setting user
//   const OpenSettings = async () => {
//     try {
//       // Membuka pengaturan aplikasi
//       await Linking.openSettings();
//     } catch (err) {
//       console.error('Tidak dapat membuka pengaturan:', err);
//     }
//   };

//   return (
//     <View style={styles.Container}>
//       <StatusBar
//         barStyle={'dark-content'}
//         translucent={true}
//         backgroundColor="transparent"
//       />

//       {/* MODAL PERMISSION CAMERA */}
//       <Modal
//         transparent={true}
//         isVisible={isModalVisible}
//         backdropColor={'#FFF'}
//         backdropOpacity={0.8}
//         animationIn="zoomInDown"
//         animationOut="zoomOutUp"
//         animationInTiming={2000}
//         animationOutTiming={2000}
//         backdropTransitionInTiming={1000}
//         backdropTransitionOutTiming={1000}>
//         <View style={styles.ContentModal}>
//           {/* input utama */}
//           <View style={styles.HeaderModal}>
//             <Image
//               source={require('../../assets/icons/silang.png')}
//               style={{
//                 width: 60,
//                 height: 60,
//               }}
//             />
//             <Text style={styles.TextWarning}>Peringatan!,</Text>
//             <Text style={styles.txtDesciption}>
//               Silahkan check permission camera anda
//             </Text>
//             <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
//               <TouchableOpacity onPress={OpenSettings}>
//                 <Text style={styles.AboutData}>Ok</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={CloseModal}>
//                 <Text style={styles.AboutData}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         codeScanner={codeScanner}
//       />

//       <Animatable.View
//         style={styles.qrScannBox}
//         animation="rotate" // Anda dapat memilih animasi yang sesuai
//         easing="linear"
//         iterationCount="infinite"
//         duration={animationDuration}
//       />

//       <View style={styles.qrScannBox} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight,
//   },
//   ContentModal: {
//     backgroundColor: '#FFF',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//   },
//   HeaderModal: {
//     justifyContent: 'center',
//   },
//   AboutData: {
//     textAlign: 'auto',
//     color: colors.black,
//     margin: 7,
//   },
//   TextWarning: {
//     color: '#000',
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: 18,
//   },
//   txtDesciption: {
//     color: '#000',
//     fontFamily: 'Poppins-Medium',
//     fontSize: 14,
//   },
//   TextClose: {
//     color: '#000',
//     fontSize: 30,
//   },
//   qrScannBox: {
//     position: 'absolute',
//     top: '30%', // Sesuaikan dengan posisi yang Anda inginkan
//     left: '10%', // Sesuaikan dengan posisi yang Anda inginkan
//     width: '80%',
//     height: '40%',
//     borderWidth: 2,
//     borderColor: colors.primary,
//   },
//   box: {
//     width: 100,
//     height: 100,
//     backgroundColor: 'blue',
//   },
// });
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function LibsTest() {
  return (
    <View>
      <Text>LibsTest.test</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
