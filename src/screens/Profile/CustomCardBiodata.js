import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../../utils/dimension';
import { colors } from '../../utils';
import { fonts } from '../../assets';

const CustomCardBiodata = ({text, styleCardBox, styleTextCard}) => {
  return (
    <View style={[styles.cardBox, styleCardBox]}>
      <Text style={[styles.textCard, styleTextCard]}>{text.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: WIDTH * 0.9,
    height: HEIGHT * 0.06,
    backgroundColor: colors.white,
    marginVertical: HEIGHT * 0.008,
    borderRadius: HEIGHT * 0.009,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 7,
  },
  textCard: {
    fontSize: HEIGHT * 0.02,
    textAlign: 'center',
    fontFamily: fonts.BebasNeueRegular,
    color: colors.blueGrey,
  },
});

export default CustomCardBiodata;
