import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils';
import {fonts} from '../assets';

export const Jumbotron = ({
  text,
  styleJumbotron,
  styleTextJumbotron,
  enableSelengkapnya = false,
  onPressSelengkapnya,
}) => {
  return (
    <View style={[styles.container, styleJumbotron]}>
      <Text style={[styles.textJumbotron, styleTextJumbotron]}>{text}</Text>
      {enableSelengkapnya && (
        <Text onPress={onPressSelengkapnya} style={styles.textSelengkapnya}>
          Lihat selengkapnya
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: HEIGHT * 0.05,
    paddingHorizontal: WIDTH * 0.03,
    paddingVertical: HEIGHT * 0.005,
    marginBottom: HEIGHT * 0.01,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: HEIGHT * 0.005,
  },
  textJumbotron: {
    fontSize: HEIGHT * 0.03,
    color: colors.darkGreyBlue,
    fontFamily: fonts.BebasNeueRegular,
  },
  textSelengkapnya: {
    fontSize: HEIGHT * 0.017,
    color: colors.blueLink,
    fontFamily: fonts.BebasNeueRegular,
  },
});
