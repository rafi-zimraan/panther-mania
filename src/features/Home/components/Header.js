import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {ImgAppLogo} from '../../../assets';
import {Gap, SearchInput} from '../../../components';
import SqaanQrUser from '../../../screens/QrScanUser/SqaanQrUser';

export default function HomeHeader({navigation}) {
  const {nama_lengkap} = useSelector(state => state.auth.user_data) || {};
  //   console.log(nama_lengkap);

  return (
    <View style={{padding: 20}}>
      <Image source={ImgAppLogo} style={{alignSelf: 'flex-end'}} />
      <Text style={styles.textGreeting}>
        Selamat datang, {nama_lengkap.split(' ')[0]}
      </Text>
      <Gap height={20} />
      <View style={styles.viewContext}>
        <SearchInput />
        <Gap width={13} />
        <SqaanQrUser navigation={navigation} />
      </View>
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
  viewContext: {
    flexDirection: 'row',
  },
});
