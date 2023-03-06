import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {colors, dimens} from '../../utils';
import {fonts} from '../../assets';

const Template = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={[styles.text, {fontSize: dimens.m}]}>Template</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: dimens.xxl,
    color: colors.black,
  },
});
export default Template;
