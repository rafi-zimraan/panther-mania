import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../utils/dimension';
import {colors} from '../utils/colors';
import {fonts} from '../assets';

const TextArea = ({
  onChangeText,
  placeholder,
  placeholderTextColor,
  value,
  enableError,
  textError,
  onBlur,
}) => {
  return (
    <View>
      <TextInput
        multiline={true}
        scrollEnabled={true}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        textAlign="left"
        style={styles.textArea}
        value={value}
        onBlur={onBlur}
      />
      {enableError && <Text style={styles.textError}>{textError}</Text>}
    </View>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  textArea: {
    backgroundColor: colors.white,
    width: WIDTH * 0.8,
    height: HEIGHT * 0.3,
    borderRadius: HEIGHT * 0.02,
    marginVertical: HEIGHT * 0.01,
    padding: HEIGHT * 0.02,
    color: colors.black,
    fontSize: HEIGHT * 0.018,
  },
  textError: {
    color: colors.reddish,
    fontFamily: fonts.BebasNeueRegular,
    fontSize: HEIGHT * 0.018,
    fontWeight: 'bold',
    textAlign: 'center',
    width: WIDTH * 0.8,
  },
});
