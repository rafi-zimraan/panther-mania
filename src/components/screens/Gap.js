import {View} from 'react-native';
import React from 'react';

export default function Gap({
  width,
  height,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
}) {
  return (
    <View
      style={{width, height, marginLeft, marginRight, marginTop, marginBottom}}
    />
  );
}
