import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Header({
  title = 'Title',
  iconName = 'chevron-left',
  onPress,
}) {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback useForeground onPress={onPress}>
        <View style={styles.btnHeader}>
          <Icon name={iconName} color={'white'} size={32} />
        </View>
      </TouchableNativeFeedback>
      <Text style={styles.titleHeader}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleHeader: {
    fontWeight: '500',
    marginHorizontal: 20,
    color: 'black',
    fontSize: 16,
  },
  btnHeader: {
    backgroundColor: 'black',
    overflow: 'hidden',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
});
