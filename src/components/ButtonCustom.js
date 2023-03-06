import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {fonts} from '../assets';
import {colors} from '../utils';
import {HEIGHT} from '../utils/dimension';

const width = Dimensions.get('window').width;

const ButtonCustom = ({
  title = 'Button',
  onPress,
  color = colors.primary,
  buttonStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[buttonStyle, styles.button, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: HEIGHT * 0.01,
    elevation: 5,
  },
  text: {
    fontFamily: fonts.BebasNeueRegular,
    color: colors.white,
    fontSize: HEIGHT * 0.03,
  },
});
export default ButtonCustom;
