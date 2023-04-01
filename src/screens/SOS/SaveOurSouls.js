import {
  StyleSheet,
  Text,
  View,
  Linking,
  PermissionsAndroid,
  Button,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import useLocation from '../../hooks/useLocation';
import {ModalLocation} from '../../features/SOS';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsersLocation} from '../../features/SOS/services/sosServices';
import ModalUserDetail from '../../features/SOS/components/ModalUserDetail';
import {SetModal} from '../../redux/slices/sosSlice';

export default function SaveOurSouls() {
  const {location, getCurrentLocation} = useLocation();
  const dispatch = useDispatch();
  const {status, users_data} = useSelector(state => state.save_our_souls);

  const [selectedMarker, setSelectedMarker] = useState({
    alamat: '',
    distance: 0,
    email: '',
    handphone: '',
    nama_lengkap: '',
    no_whatsapp: '',
    user_id: 0,
  });

  useEffect(() => {
    if (status == 'idle') dispatch(fetchUsersLocation());
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      {!location.loading && (
        <MapView
          showsCompass
          showsMyLocationButton
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {users_data?.length == 0 && (
            <Text>Sepertinya tidak ada pengguna yang bisa dihubungi..</Text>
          )}
          <Marker
            pinColor="orange"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}>
            <Callout>
              <Text style={{color: 'black'}}>Anda berada disini</Text>
            </Callout>
          </Marker>
          {users_data?.map((v, i) => (
            <Marker
              key={i}
              onPress={() => {
                setSelectedMarker(v);
                dispatch(SetModal(true));
              }}
              coordinate={{
                latitude: parseFloat(v.lat),
                longitude: parseFloat(v.lng),
              }}></Marker>
          ))}
        </MapView>
      )}
      <ModalUserDetail data={selectedMarker} />
      <ModalLocation />
    </View>
  );
}

const styles = StyleSheet.create({});
