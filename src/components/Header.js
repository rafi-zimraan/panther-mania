import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/dimension';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {images} from '../assets';
import {colors} from '../utils';

export const Header = ({
  styleHeader,
  logoEnable = false,
  buttonBackEnable = true,
  styleLogoPantherMania,
  BackPress,
}) => {
  return (
    <View style={[styles.container, styleHeader]}>
      <View
        style={[
          styles.wrapperIconBackAndLogo,
          buttonBackEnable && {justifyContent: 'space-between'},
          logoEnable && {justifyContent: 'flex-end'},
          buttonBackEnable &&
            logoEnable === true && {justifyContent: 'space-between'},
        ]}>
        {buttonBackEnable && (
          <TouchableOpacity style={styles.buttonIconBack} onPress={BackPress}>
            <Icon
              name="chevron-left"
              size={HEIGHT * 0.04}
              color={colors.white}
            />
          </TouchableOpacity>
        )}

        {logoEnable && (
          <Image
            source={images.logopanthermania}
            style={[styles.logoPantherMania, styleLogoPantherMania]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEIGHT * 0.05,
    backgroundColor: 'transparent',
    marginBottom: HEIGHT * 0.02,
    paddingVertical: HEIGHT * 0.02,
  },
  wrapperIconBackAndLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WIDTH * 0.04,
  },
  buttonIconBack: {
    width: WIDTH * 0.1,
    height: HEIGHT * 0.045,
    backgroundColor: colors.black,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoPantherMania: {
    width: WIDTH * 0.4,
    height: HEIGHT * 0.066,
  },
});
