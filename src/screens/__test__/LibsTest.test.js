import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

export default function LibsTest() {
  const Permit = PermissionsAndroid;

  async function requestCamera() {
    const granted = await Permit.request(Permit.PERMISSIONS.CAMERA);
    if (granted == Permit.RESULTS.GRANTED) console.log('granted bois letsgo');
  }

  // get the barcodes
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null) return <Text>Loading heula...</Text>;
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      frameProcessorFps={5}
    />
  );
}

const styles = StyleSheet.create({});
