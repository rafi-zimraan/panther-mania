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

export default function SaveOurSouls() {
  const {location, getCurrentLocation} = useLocation();

  const userLocations = [
    {
      latitude: -7.995307,
      longitude: 110.296256,
      whatsapp: 6285157439660,
      user_name: 'Radiant',
    },
    {
      latitude: -7.997018,
      longitude: 110.297909,
      whatsapp: 6285695078232,
      user_name: 'Jujun',
    },
    {
      latitude: -7.996729,
      longitude: 110.294103,
      whatsapp: 6285659033185,
      user_name: 'David',
    },
  ];

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
          {userLocations.map((v, i) => (
            <Marker
              onSelect={() => console.log('on select')}
              onCalloutPress={() => console.log('on callout press')}
              onPress={async () =>
                await Linking.openURL(`https://wa.me/${v.whatsapp}`)
              }
              onDeselect={() => console.log('on deselect')}
              key={i}
              coordinate={{
                latitude: v.latitude,
                longitude: v.longitude,
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
