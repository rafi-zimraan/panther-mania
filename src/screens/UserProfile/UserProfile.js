import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableNativeFeedback,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import {BackgroundImage, Gap, Header} from '../../components';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch, useSelector} from 'react-redux';
import {ResetUserCredential} from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useOrientation from '../../utils/useOrientation';
import {fetchSignOut} from '../../features/Auth/services/signOutServices';
import {API_KEY_IMAGE} from '@env';

export default function UserProfile({navigation}) {
  const dispatch = useDispatch();
  const {isPortrait} = useOrientation();
  const {user_data, status_signout: status} = useSelector(state => state.auth);
  const {nama_lengkap, handphone, panther_nopol, user_id} = user_data;

  const ButtonOption = ({
    onPress,
    title,
    backgroundColor = '#183240',
    loading,
  }) => {
    return (
      <TouchableNativeFeedback
        useForeground
        onPress={onPress}
        disabled={status == 'pending'}>
        <View style={{...styles.btnOption, backgroundColor}}>
          {loading ? (
            <ActivityIndicator color={'white'} style={styles.textOption} />
          ) : (
            <Text style={styles.textOption}>{title}</Text>
          )}
        </View>
      </TouchableNativeFeedback>
    );
  };

  // console.log(API_KEY_IMAGE);

  const a = {
    agama: 'Islam',
    aktif: 1,
    alamat: 'Alamat Lengkap',
    alamat_perusahaan: 'Alamat Perusahaan',
    created_at: '2023-03-29 14:15:46',
    email: 'testing101@gmail.com',
    gender: 'Perempuan',
    handphone: '083726374822',
    hobby: '',
    id: 2350,
    kabupaten: 'Kabupaten Kota',
    kecamatan: 'Kecamatan',
    kelurahan: 'Kelurahan',
    kodepos: 'Kodepos',
    korwil: '',
    korwil_uuid: '',
    ktp: '/tmp/php6n6QDj',
    lat: '12.3123',
    lng: '123.123123',
    nama_lengkap: 'Tester Aplikasi',
    nama_perusahaan: 'Nama Perusahaan',
    no_whatsapp: '908091823098',
    nomor: '0',
    panther_no_chasis: '098rerwe098r32098',
    panther_no_engine: '0234890jihu94898',
    panther_nopol: '21309jioj0909',
    panther_pajak: '2002-02-02',
    panther_tahun: '2020',
    panther_type: 'Truk',
    panther_warna: 'Merah Banteng',
    pekerjaan: 'Pekerjaan',
    progress: 0,
    provinsi: 'Provinsi',
    rfid: '',
    sekolah: 'Sekolah',
    sim: '/tmp/php4KhrXj',
    status_nikah: 'Menikah',
    tanggal_lahir: '2002-02-02',
    telp_kantor: '0650545623155',
    telp_rumah: '0650545623155',
    tempat_lahir: 'Tempat Lahir',
    ukuran_baju: 'L',
    updated_at: '2023-03-29 14:15:46',
    user_id: 3150,
    uuid: '341220230329141545',
  };

  function handleSignOut() {
    return Alert.alert(
      'Keluar',
      'Sesi Anda akan berakhir.',
      [
        {text: 'Keluar', onPress: () => dispatch(fetchSignOut(navigation))},
        {text: 'Kembali'},
      ],
      {cancelable: true},
    );
  }

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView
        contentContainerStyle={{flex: isPortrait ? 1 : 0}}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll>
        <Header title="Profil Anda" onPress={() => navigation.goBack()} />
        <View style={styles.viewProfile}>
          <View style={styles.imgPfp}>
            <Image
              source={{uri: `${API_KEY_IMAGE}/profile/${user_id}.jpg`}}
              style={{width: '100%', height: '100%'}}
            />
            {/* <Icon name={'account-circle'} size={200} color={'grey'} /> */}
          </View>
          <Text style={styles.textUsername}>{nama_lengkap}</Text>
        </View>
        <View style={styles.viewProfileDetail}>
          <Text style={styles.textUserDetail}>{nama_lengkap}</Text>
          <Text style={styles.textUserDetail}>{handphone}</Text>
          <Text style={styles.textUserDetail}>{panther_nopol}</Text>
          <Gap flex={isPortrait ? 1 : 0} height={isPortrait ? 0 : 100} />
          <ButtonOption
            title={'Perbarui Profil'}
            onPress={() => navigation.navigate('EditUserProfile')}
          />
          <Gap height={10} />
          <ButtonOption
            title={'Keluar'}
            backgroundColor={'tomato'}
            loading={status == 'pending'}
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textOption: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
  },
  btnOption: {
    width: '90%',
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    elevation: 3,
  },
  imgPfp: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 50,
    overflow: 'hidden',
  },
  textUserDetail: {
    backgroundColor: 'white',
    elevation: 3,
    padding: 15,
    width: '80%',
    textAlign: 'center',
    margin: 5,
    borderRadius: 10,
    color: 'black',
    fontWeight: '500',
  },
  viewProfileDetail: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 1,
    padding: 20,
    paddingVertical: 40,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  textUsername: {
    color: 'black',
    fontSize: 20,
    margin: 20,
    fontWeight: '500',
  },
  viewProfile: {
    alignItems: 'center',
  },
});
