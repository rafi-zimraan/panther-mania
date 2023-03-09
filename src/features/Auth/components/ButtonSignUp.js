import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React from 'react';

export default function ButtonSignUp({onPress, loading, disabled}) {
  return (
    <TouchableNativeFeedback
      useForeground
      onPress={onPress}
      disabled={disabled}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            color={'white'}
            size={'large'}
            style={styles.textTitle}
          />
        ) : (
          <Text style={{...styles.textTitle, opacity: disabled ? 0.5 : 1}}>
            DAFTAR
          </Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    overflow: 'hidden',
    backgroundColor: '#183240',
    maxWidth: 250,
    marginHorizontal: 30,
    height: 60,
    borderRadius: 60 / 2,
    elevation: 3,
    alignSelf: 'center',
    width: '100%',
  },
});
