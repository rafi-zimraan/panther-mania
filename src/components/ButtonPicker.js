import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import CarPantherMania from './CarPantherMania';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils';
import {fonts} from '../assets';

const ButtonPicker = ({
  empty = true,
  styleImage,
  sourceImage,
  text,
  onPick,
  disabled,
  styleButtonPicker,
  styleImageCar,
  styleLogoPantherMania,
  styleWrapperLogoPantherAndCar,
  styleText,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        !empty && {height: HEIGHT * 0.2},
        styleButtonPicker,
      ]}
      onPress={onPick}
      disabled={disabled}>
      {empty ? (
        <View>
          <CarPantherMania
            styleImageCar={[
              {
                width: WIDTH * 0.15,
                height: HEIGHT * 0.05,
              },
              styleImageCar,
            ]}
            styleLogoPantherMania={[
              {
                marginLeft: WIDTH * -0.01,
                width: WIDTH * 0.13,
                height: HEIGHT * 0.02,
              },
              styleLogoPantherMania,
            ]}
            styleWrapperLogoPantherAndCar={[
              {
                marginTop: 0,
                opacity: 0.3,
              },
              styleWrapperLogoPantherAndCar,
            ]}
          />
          <Text style={[styles.styleText, styleText]}>{text}</Text>
        </View>
      ) : (
        <Image style={[styles.styleImage, styleImage]} source={sourceImage} />
      )}
    </TouchableOpacity>
  );
};

export default ButtonPicker;

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.11,
    borderRadius: WIDTH * 0.05,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 20,
  },
  styleWrapperImageAndText: {
    backgroundColor: colors.red,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: HEIGHT * 0.02,
  },
  styleText: {
    fontSize: HEIGHT * 0.015,
    fontFamily: fonts.BebasNeueRegular,
    color: 'rgba(42, 84, 96, 0.5)',
  },
  styleImage: {
    width: WIDTH * 0.9,
    height: HEIGHT * 0.2,
    borderRadius: WIDTH * 0.05,
  },
});
