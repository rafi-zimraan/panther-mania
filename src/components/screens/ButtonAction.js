import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ButtonAction({
  title = 'Button',
  onPress,
  disabled,
  backgroundColor = '#183240',
  loading = false,
  iconLeft = 'account',
  iconRight = 'account',
}) {
  return (
    <TouchableNativeFeedback
      useForeground
      onPress={onPress}
      disabled={disabled}>
      <View style={{...styles.container, backgroundColor}}>
        {loading ? (
          <ActivityIndicator
            color={'white'}
            size={'small'}
            style={styles.textTitle}
          />
        ) : (
          <Text style={styles.textTitle}>{title}</Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
  container: {
    width: '90%',
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    elevation: 3,
    alignSelf: 'center',
  },
});
