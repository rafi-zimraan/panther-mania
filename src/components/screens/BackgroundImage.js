import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {ImgBgPlain} from '../../assets';
import useOrientation from '../../hooks/useOrientation';

export default function BackgroundImage({source = ImgBgPlain}) {
  const {width, height} = useOrientation();
  return (
    <Image source={source} style={{width, height, position: 'absolute'}} />
  );
}

const styles = StyleSheet.create({});
