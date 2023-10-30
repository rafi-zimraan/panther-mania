import {
  ActivityIndicator,
  Button,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {ImgBGDefault, ImgPMCar} from '../../assets';
import useOrientation from '../../hooks/useOrientation';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignIn} from '../../features/Auth/services/signInServices';
import {Gap} from '../../components';
import useLocation from '../../hooks/useLocation';
import {usePermission} from '../../hooks';
import {AccessCoarseLocation, AccessFineLocation} from '../../utils/constant';

export default function Splash({navigation}) {
  const dispatch = useDispatch();
  const {status_signin: status} = useSelector(state => state.auth);
  const {height, width} = useOrientation();
  const {location, getCurrentLocation} = useLocation();
  const {requestPermission: reqCoarseLocation, granted: grantedCoarse} =
    usePermission(AccessCoarseLocation);
  const {requestPermission: reqFineLocation, granted: grantedFine} =
    usePermission(AccessFineLocation);

  useEffect(() => {
    reqFineLocation();
    reqCoarseLocation();
    getCurrentLocation();
    async function refreshSession() {
      const credential = await EncryptedStorage.getItem('user_credential');
      if (credential) {
        const {email, password} = JSON.parse(credential);
        console.log(email, password);
        const formData = {
          email,
          password,
          navigation,
          lat: location.latitude,
          lng: location.longitude,
          splash: true,
        };
        dispatch(fetchSignIn(formData));
      } else {
        const firstInit = await EncryptedStorage.getItem('first_init');
        setTimeout(() => {
          firstInit
            ? navigation.replace('AuthMethod')
            : navigation.replace('OnBoarding');
        }, 1500);
      }
    }
    location.altitude && refreshSession();
  }, [grantedFine, grantedCoarse, location.altitude]);

  return (
    <View style={styles.container}>
      {/* <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        animated
      /> */}
      <Gap height={StatusBar.currentHeight} />
      <Image
        source={ImgBGDefault}
        style={{width, height, position: 'absolute'}}
      />
      <Image source={ImgPMCar} />
      <ActivityIndicator
        color={'white'}
        animating={status == 'pending'}
        size={'large'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
