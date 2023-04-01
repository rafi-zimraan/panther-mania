import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import Gap from './Gap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchInput() {
  return (
    <View style={styles.containerSearchBar}>
      <Icon name="magnify" color={'black'} size={30} />
      <Gap width={5} />
      <TextInput
        placeholder="Cari sesuatu.."
        placeholderTextColor={'grey'}
        style={{flex: 1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerSearchBar: {
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
});
