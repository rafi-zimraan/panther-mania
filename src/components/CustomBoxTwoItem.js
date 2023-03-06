import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils';
import {fonts} from '../assets';

const CustomBoxTwoItem = ({
  buttonDisable,
  textItemLeft,
  textItemRight,
  bgColorTwoItem = true,
  colorTwoItem = true,
  onPick,
  enableItemTwo = true,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.styleTextItemLeft}>{textItemLeft}</Text>
      {enableItemTwo && (
        <TouchableOpacity
          style={[
            styles.styleWrapperItemRight,
            {
              backgroundColor: bgColorTwoItem
                ? colors.desertStrom
                : colors.rubyRed,
            },
          ]}
          onPress={onPick}
          disabled={buttonDisable}>
          <Text
            style={[
              styles.styleTextItemRight,
              {color: colorTwoItem ? colors.boulder : colors.white},
            ]}>
            {textItemRight}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomBoxTwoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: HEIGHT * 0.05,
    borderRadius: HEIGHT * 0.02,
    paddingLeft: WIDTH * 0.04,
    paddingVertical: HEIGHT * 0.005,
    marginBottom: HEIGHT * 0.01,
    marginHorizontal: WIDTH * 0.05,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    elevation: 10,
  },
  styleTextItemLeft: {
    fontSize: HEIGHT * 0.016,
    fontFamily: fonts.BebasNeueRegular,
    color: colors.boulder,
  },
  styleWrapperItemRight: {
    backgroundColor: colors.desertStrom,
    borderRadius: WIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'center',
    width: WIDTH * 0.4,
    height: HEIGHT * 0.05,
    paddingHorizontal: WIDTH * 0.02,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    elevation: 10,
  },
  styleTextItemRight: {
    fontSize: HEIGHT * 0.016,
    fontFamily: fonts.BebasNeueRegular,
  },
});
