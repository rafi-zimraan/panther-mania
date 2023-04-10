import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import {ModalLocation} from '../../features/SOS';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsersLocation} from '../../features/SOS/services/sosServices';
import ModalUserDetail from '../../features/SOS/components/ModalUserDetail';
import {SetModal} from '../../redux/slices/sosSlice';

export default function SaveOurSouls() {
  const dispatch = useDispatch();
  const {status, users_data, coords} = useSelector(
    state => state.save_our_souls,
  );
  const {latitude, longitude} = coords;

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
    setTimeout(() => {
      dispatch(fetchUsersLocation());
    }, 1000);
  }, []);

  const mapRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        showsCompass
        showsMyLocationButton
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}>
        <Marker pinColor="dodgerblue" coordinate={{latitude, longitude}}>
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
      <ModalUserDetail data={selectedMarker} />
      <ModalLocation />
    </View>
  );
}

const styles = StyleSheet.create({});
