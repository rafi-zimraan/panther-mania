import {Text, View} from 'react-native';
import React from 'react';
import {Modal} from 'react-native-paper';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {fonts} from '../assets';
import Lottie from 'lottie-react-native';
import {colors} from '../utils';

const Loader = ({isVisible}) => {
  return (
    <Modal visible={isVisible} dismissable={false} style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          top: HEIGHT * -0.28,
          left: WIDTH * -0.16,
          justifyContent: 'center',
          alignItems: 'center',
          padding: HEIGHT * 0.03,
          backgroundColor: 'transparent',
        }}>
        <Lottie
          source={require('../assets/images/LottieImage/loader.json')}
          autoPlay
          loop
          style={{
            width: WIDTH * 1,
            height: HEIGHT * 0.4,
          }}
        />
      </View>
    </Modal>
  );
};

export default Loader;
