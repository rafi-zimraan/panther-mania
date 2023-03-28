import React, {useState, useEffect} from 'react';
import {PermissionsAndroid, ToastAndroid, Alert, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

export default async function useLocation() {
  const navigation = useNavigation();
  const Permit = PermissionsAndroid;
  const [coords, setCoords] = useState({
    accuracy: null,
    altitude: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    altitudeAccuracy: null,
  });

  const getPosition = async () => {
    try {
      const grantedFine = await Permit.request(
        Permit.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const grantedCoarse = await Permit.request(
        Permit.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      if (
        grantedFine === 'never_ask_again' ||
        grantedCoarse === 'never_ask_again'
      ) {
        ToastAndroid.show('Izin lokasi diperlukan', ToastAndroid.LONG);
        Alert.alert(
          'Izin Lokasi',
          'Izin lokasi diperlukan untuk fitur seperti SOS',
          [
            {text: 'Batal', onPress: () => navigation.goBack()},
            {text: 'Beri Izin', onPress: () => Linking.openSettings()},
          ],
          {cancelable: false},
        );
      } else if (grantedFine === 'granted' && grantedCoarse === 'granted') {
        Geolocation.getCurrentPosition(
          ({coords}) => {
            setCoords(coords);
          },
          ({code, message}) => {
            ToastAndroid.show(
              `Terjadi kesalahan: ${message}`,
              ToastAndroid.SHORT,
            );
          },
          {enableHighAccuracy: true},
        );
      } else
        Alert.alert(
          'Izin Lokasi',
          'Izin lokasi diperlukan untuk fitur seperti SOS',
          [
            {text: 'Batal', onPress: () => navigation.goBack()},
            {text: 'Beri Izin', onPress: () => useLocation()},
          ],
          {cancelable: false},
        );
    } catch (error) {
      ToastAndroid.show(
        `Terjadi kesalahan: ${error.message}`,
        ToastAndroid.SHORT,
      );
    }
  };
  useEffect(() => {
    getPosition();
  }, []);

  return {...coords};
}
