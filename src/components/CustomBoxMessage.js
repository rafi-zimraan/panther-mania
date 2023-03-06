import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {fonts} from '../assets';
import {colors} from '../utils';

const CustomBoxMessage = ({
  styleCustomBoxMessage,
  styleTextMessage,
  text,
  type,
  platformIcon = 'Icon',
  iconRightEnable = false,
  iconRightName,
  iconRightSize,
  iconRightColor,
  sourceRightImage,
  styleRightImage,
  iconLeftEnable = false,
  iconLeftName,
  iconLeftSize,
  iconLeftColor,
  sourceLeftImage,
  styleLeftImage,
}) => {
  const [color, setColor] = useState('#000');

  useEffect(() => {
    switch (true) {
      case type === 'success':
        setColor(colors.lightForestGreen);

      case type === 'failed':
        setColor(colors.reddish03);
    }
  }, [color]);

  const renderIconLeft = () => {
    switch (true) {
      case platformIcon === 'Icon' && iconLeftEnable:
        return (
          <Icon name={iconLeftName} size={iconLeftSize} color={iconLeftColor} />
        );

      case platformIcon === 'Image' && iconLeftEnable:
        return (
          <Image
            source={sourceLeftImage}
            style={[styles.styleImage, styleLeftImage]}
          />
        );

      case !iconLeftColor:
        return null;
    }
  };

  const renderIconRight = () => {
    switch (true) {
      case platformIcon === 'Icon' && iconRightEnable:
        return (
          <Icon
            name={iconRightName}
            size={iconRightSize}
            color={iconRightColor}
          />
        );

      case platformIcon === 'Image' && iconRightEnable:
        return (
          <Image
            source={sourceRightImage}
            style={[styles.styleImage, styleRightImage]}
          />
        );

      case !iconRightEnable:
        return null;
    }
  };

  const renderText = () => {
    return <Text style={[styles.styleText, styleTextMessage]}>{text}</Text>;
  };

  return (
    <View style={[styles.container, styleCustomBoxMessage]}>
      {renderIconLeft()}
      {renderText()}
      {renderIconRight()}
    </View>
  );
};

export default CustomBoxMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.reddish,
    padding: HEIGHT * 0.005,
    borderRadius: HEIGHT * 0.05,
  },
  styleImage: {
    width: WIDTH * 0.06,
    height: HEIGHT * 0.035,
    marginRight: WIDTH * 0.02,
    position: 'absolute',
    top: -3,
    left: WIDTH * -0.01,
  },
  styleText: {
    fontSize: HEIGHT * 0.018,
    fontFamily: fonts.BebasNeueRegular,
    marginLeft: WIDTH * 0.06,
    marginRight: WIDTH * 0.03,
    color: colors.white,
  },
});
