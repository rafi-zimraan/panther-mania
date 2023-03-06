import {Text, Pressable, View} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils';
import { fonts } from '../assets';
import { Modal } from 'react-native-paper';

const TwoButtonChoose = ({visible, onDismiss, textOne, textTwo, pressButtonOne, pressButtonTwo}) => {

  return (
    <Modal
    visible={visible}
    onDismiss={onDismiss}
    style={{flex: 1}}
    >
    <View
    style={{
      position: 'absolute',
      top: HEIGHT * -0.1,
      left: WIDTH * 0.05,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
      width: WIDTH * 0.9,
      alignSelf: 'center',
      borderRadius: HEIGHT * 0.01,
    }}>
          <Pressable
            onPress={pressButtonOne}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.darkGreyBlue,
              borderRadius: HEIGHT * 0.01,
              width: WIDTH * 0.5,
              height: HEIGHT * 0.06,
              marginVertical: HEIGHT * 0.02,
              marginTop: HEIGHT * 0.03
            }}>
            <Text
              style={{
                fontSize: HEIGHT * 0.02,
                fontFamily: fonts.BebasNeueRegular,
                color: colors.white,
              }}>
              {textOne}
            </Text>
          </Pressable>

          <Pressable
            onPress={pressButtonTwo}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.darkGreyBlue,
              borderRadius: HEIGHT * 0.01,
              width: WIDTH * 0.5,
              height: HEIGHT * 0.06,
              marginTop: HEIGHT * -0.01,
              marginBottom: HEIGHT * 0.03
            }}>
            <Text
              style={{
                fontSize: HEIGHT * 0.02,
                fontFamily: fonts.BebasNeueRegular,
                color: colors.white,
              }}>
              {textTwo}
            </Text>
          </Pressable>
  </View>
  </Modal>
  );
};

export default TwoButtonChoose;
