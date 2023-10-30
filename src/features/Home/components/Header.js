import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {ImgAppLogo} from '../../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Gap, SearchInput} from '../../../components';

export default function HomeHeader() {
  const {nama_lengkap} = useSelector(state => state.auth.user_data);

  return (
    <View style={{padding: 20}}>
      <Image source={ImgAppLogo} style={{alignSelf: 'flex-end'}} />
      <Text style={styles.textGreeting}>
        Selamat datang, {nama_lengkap.split(' ')[0]}
      </Text>
      <Gap height={20} />
      <SearchInput />
      <Gap height={20} />
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
  textGreeting: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
});
