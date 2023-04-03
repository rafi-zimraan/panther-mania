import {View, Text} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useLocation} from '../../hooks';

export default function LibsTest() {
  const {location} = useLocation();
  return (
    <View style={{flex: 1}}>
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
        {/* {users_data?.length == 0 && (
            <Text>Sepertinya tidak ada pengguna yang bisa dihubungi..</Text>
          )}
          <Marker
            pinColor="dodgerblue"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}>
            <Callout>
              <Text style={{color: 'black'}}>Anda berada disini</Text>
            </Callout>
          </Marker>
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={20000}
            fillColor="rgba(66, 135, 245,0.25)"
            strokeColor="rgba(66, 135, 245, 1)"
            strokeWidth={2}
          />
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
          ))} */}
      </MapView>
    </View>
  );
}
