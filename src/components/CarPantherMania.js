import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {images} from '../assets';

const CarPantherMania = ({styleWrapperLogoPantherAndCar, styleImageCar}) => {
  return (
    <View
      style={[styles.wrapperLogoPantherAndCar, styleWrapperLogoPantherAndCar]}>
      <Image
        source={images.imagepanther}
        style={[styles.imageCar, styleImageCar]}
      />
    </View>
  );
};

export default CarPantherMania;

const styles = StyleSheet.create({
  wrapperLogoPantherAndCar: {
    alignSelf: 'center',
    marginTop: HEIGHT * 0.15,
  },
  imageCar: {
    width: WIDTH * 0.74,
    height: HEIGHT * 0.3,
  },
});
