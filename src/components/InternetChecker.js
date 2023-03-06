import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Modal} from 'react-native-paper';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {fonts} from '../assets';
import Lottie from 'lottie-react-native';
import {colors} from '../utils';

const InternetChecker = () => {
  const [isOffline, setIsOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setIsOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  const renderViewModal = () => {
    return (
      <Modal visible={isOffline} dismissable={false}>
        <View
          style={{
            position: 'absolute',
            top: HEIGHT * -0.35,
            justifyContent: 'center',
            alignItems: 'center',
            padding: HEIGHT * 0.03,
            backgroundColor: 'transparent',
          }}>
          <Lottie
            source={require('../assets/images/LottieImage/no_internet.json')}
            autoPlay
            loop
            style={{
              width: WIDTH * 1,
              height: HEIGHT * 0.4,
            }}
          />
          <Text
            style={{
              bottom: HEIGHT * 0.04,
              fontSize: HEIGHT * 0.03,
              fontFamily: fonts.BebasNeueRegular,
              textAlign: 'center',
              color: colors.white,
              textShadowColor: colors.black,
              textShadowOffset: {
                width: 0,
                height: 3,
              },
              textShadowRadius: 20,
            }}>
            Jaringan terputus, tolong sambungkan jaringan anda ke internet
          </Text>
        </View>
      </Modal>
    );
  };

  return renderViewModal();
};

export default InternetChecker;
