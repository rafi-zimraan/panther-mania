import {
  StyleSheet,
  Text,
  View,
  Linking,
  PermissionsAndroid,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import useLocation from '../../hooks/useLocation';
import usePermission from '../../hooks/usePermission';
import {ModalLocation} from '../../features/SOS';
import {AccessCoarseLocation, AccessFineLocation} from '../../utils/constant';
import axios from 'axios';
import {useSelector} from 'react-redux';

export default function SaveOurSouls() {
  const {location, getCurrentLocation} = useLocation();
  const {token} = useSelector(state => state.auth);
  const [locationData, setLocationData] = useState([]);

  function getLocationData() {
    axios
      .get('https://panther-mania.id/api/v1/sos', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      .then(res => setLocationData(res.data.data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getLocationData();
  }, []);

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
          {locationData.length != 0 &&
            locationData.map((v, i) => (
              <Marker
                onSelect={() => console.log('on select')}
                onCalloutPress={() => console.log('on callout press')}
                onPress={async () =>
                  await Linking.openURL(`https://wa.me/${v.no_whatsapp}`)
                }
                onDeselect={() => console.log('on deselect')}
                key={i}
                coordinate={{
                  latitude: parseInt(v.lat),
                  longitude: parseInt(v.lng),
                }}></Marker>
            ))}
        </MapView>
      )}
      {/* <Button title="start watching" onPress={() => startWatching()} /> */}
      <ModalLocation />
      {/* <Text style={{marginVertical: 10}}>
        {locationFine && locationCoarse
          ? 'location granted'
          : 'location isnt granted'}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({});
