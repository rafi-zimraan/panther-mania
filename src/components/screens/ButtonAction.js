import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gap from './Gap';

export default function ButtonAction({
  title = 'Button',
  onPress,
  disabled,
  backgroundColor = '#183240',
  loading = false,
  iconLeft,
  iconRight,
}) {
  return (
    <TouchableNativeFeedback
      useForeground
      onPress={onPress}
      disabled={disabled}>
      <View style={{...styles.container, backgroundColor}}>
        {loading ? (
          <ActivityIndicator color={'white'} size={'small'} />
        ) : (
          <View style={styles.viewTitle}>
            {iconLeft && <Icon name={iconLeft} size={22} color={'white'} />}
            <Text
              style={styles.textTitle}
              adjustsFontSizeToFit
              allowFontScaling>
              {title}
            </Text>
            {iconRight && <Icon name={iconRight} size={22} color={'white'} />}
          </View>
        )}
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textTitle: {
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    marginHorizontal: 5,
  },
  container: {
    width: '90%',
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    elevation: 3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
