import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {fonts} from '../assets';
import {colors} from '../utils';
import {GlobalContext} from '../Store/globalContext';

const CustomMenu = ({
  sourceImage,
  textTitle,
  onPress,
  styleContainer,
  styleWrapperImageAndText,
  styleImage,
  styleText,
}) => {
  const globalContext = useContext(GlobalContext);
  const dark = globalContext.state.isDark;

  return (
    <TouchableOpacity
      style={[styles.container, styleContainer]}
      onPress={onPress}>
      <View style={[styles.wrapperImageAndText, styleWrapperImageAndText]}>
        <Image source={sourceImage} style={[styles.image, styleImage]} />
      </View>
      <Text style={[styles.text, {color: dark ? 'gray' : 'gray'}, styleText]}>
        {textTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperImageAndText: {
    padding: WIDTH * 0.015,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderTopLeftRadius: HEIGHT * 0.03,
    borderTopRightRadius: HEIGHT * 0.03,
    borderBottomLeftRadius: HEIGHT * 0.03,
    borderBottomRightRadius: HEIGHT * 0.03,
    marginVertical: HEIGHT * 0.01,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    shadowColor: colors.black,
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: HEIGHT * 0.011,
  },
  image: {
    width: WIDTH * 0.11,
    height: HEIGHT * 0.045,
  },
  text: {
    fontSize: HEIGHT * 0.009,
    fontWeight: '900',
    fontFamily: fonts.BebasNeueRegular,
    maxWidth: WIDTH * 0.23,
    textAlign: 'center',
  },
});

export default CustomMenu;
