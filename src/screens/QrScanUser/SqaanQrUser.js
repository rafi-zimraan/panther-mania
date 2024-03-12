import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {IconSqaanQR} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

export default function SqaanQrUser() {
  const {qr_loading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePress = () => {
    setIsLoading(true);
    dispatch({type: 'SET_QR_LOADING', payload: true});

    setTimeout(() => {
      setIsLoading(false);
      dispatch({type: 'SET_QR_LOADING', payload: false});
      navigation.navigate('SqanQrUserDetails');
    }, 400); // Simulate a 3-second loading time
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={IconSqaanQR} style={styles.sqaanQr} />
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        statusBarTranslucent={true}
        visible={isLoading}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  sqaanQr: {
    height: 44,
    width: 36,
    top: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Translucent background
  },
});
