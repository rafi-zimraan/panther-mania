import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';

export default function ButtonAuthMethod({onPress, title = 'method'}) {
  return (
    <TouchableNativeFeedback useForeground onPress={onPress}>
      <View style={styles.btnContainer}>
        <Text style={styles.btnTextTitle}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#183240',
    overflow: 'hidden',
    height: 50,
    maxWidth: 230,
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 50 / 2,
  },
  btnTextTitle: {
    color: 'white',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
