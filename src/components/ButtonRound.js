import {Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils';
import {fonts} from '../assets';

const ButtonRound = ({
  type = 'text',
  text,
  onPress,
  width = WIDTH * 0.13,
  height = HEIGHT * 0.06,
  color = colors.darkGreyBlue,
  iconName,
  iconSize = HEIGHT * 0.03,
  iconColor = colors.white,
  textSize = HEIGHT * 0.02,
  textColor = colors.white,
  round = HEIGHT * 0.1,
}) => {
  const handleType = () => {
    switch (type) {
      case 'text':
        return (
          <Text
            style={{
              fontSize: textSize,
              fontFamily: fonts.BebasNeueRegular,
              color: textColor,
            }}>
            {text}
          </Text>
        );

      case 'icon':
        return <Icon name={iconName} size={iconSize} color={iconColor} />;
    }
  };
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color,
        borderRadius: round,
        width: width,
        height: height,
      }}>
      {handleType()}
    </Pressable>
  );
};

export default ButtonRound;
