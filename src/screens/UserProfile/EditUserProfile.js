import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BackgroundImage, ButtonAction, Gap, Header} from '../../components';
import Geolocation from '@react-native-community/geolocation';
import {fetchUpdateUserProfile} from '../../features/UserProfile/services/userProfileServices';
import {useForm} from 'react-hook-form';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {storage_keys} from '../../utils/constant';

export default function EditUserProfile({navigation}) {
  // console.log(API_KEY_IMAGE);
  const dispatch = useDispatch();
  const {status_user_profile, user_data} = useSelector(state => state.auth);
  const {user_id} = user_data;

  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1000); // "lazy render"

  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      agama: user_data.agama,
      alamat_lengkap: user_data.alamat,
      alamat_perusahaan: user_data.alamat_perusahaan,
      email: user_data.email,
      handphone: user_data.handphone,
      jenis_kelamin: user_data.gender,
      kabupaten_kota: user_data.kabupaten,
      kecamatan: user_data.kecamatan,
      kelurahan: user_data.kelurahan,
      kodepos: user_data.kodepos,
      lat: parseFloat(user_data.lat), // avoid string val
      lng: parseFloat(user_data.lng), // avoid string val
      nama_lengkap: user_data.nama_lengkap,
      nama_perusahaan: user_data.nama_perusahaan,
      no_chasis: user_data.panther_no_chasis,
      no_engine: user_data.panther_no_engine,
      no_ktp: user_data.ktp,
      no_polisi: user_data.panther_nopol,
      no_sim: user_data.sim,
      no_whatsapp: user_data.no_whatsapp,
      pekerjaan: user_data.pekerjaan,
      provinsi: user_data.provinsi,
      sekolah: user_data.sekolah,
      status_nikah: user_data.status_nikah,
      tahun_kendaraan: user_data.panther_tahun,
      tanggal_lahir: user_data.tanggal_lahir,
      tanggal_pajak: user_data.panther_pajak,
      telp_kantor: user_data.telp_kantor,
      telp_rumah: user_data.telp_rumah,
      tempat_lahir: user_data.tempat_lahir,
      type_kendaraan: user_data.panther_type,
      ukuran_baju: user_data.ukuran_baju,
      warna_kendaraan: user_data.panther_warna,
    },
  });

  const [loadingLocation, setLoadingLocation] = useState(false);
  async function updateLocation() {
    const Permit = PermissionsAndroid;
    setLoadingLocation(true);
    try {
      const grantedFine = await Permit.request(
        Permit.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const grantedCoarse = await Permit.request(
        Permit.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      if (
        grantedFine === 'never_ask_again' ||
        grantedCoarse === 'never_ask_again'
      ) {
        setLoadingLocation(false);
        Alert.alert(
          'Izin Lokasi',
          'Izin lokasi diperlukan untuk fitur seperti SOS',
          [
            {text: 'Batal', onPress: () => navigation.goBack()},
            {text: 'Beri Izin', onPress: () => Linking.openSettings()},
          ],
          {cancelable: false},
        );
        return;
      } else if (grantedFine === 'granted' && grantedCoarse === 'granted') {
        Geolocation.getCurrentPosition(
          ({coords}) => {
            ToastAndroid.show('Lokasi diperbarui', ToastAndroid.SHORT);
            setLoadingLocation(false);
            setValue('lat', coords.latitude);
            setValue('lng', coords.longitude);
          },
          ({message}) => {
            setLoadingLocation(false);
            ToastAndroid.show(
              `Terjadi kesalahan: ${message}`,
              ToastAndroid.SHORT,
            );
          },
          {enableHighAccuracy: true},
        );
        return;
      } else {
        setLoadingLocation(false);
        Alert.alert(
          'Izin Lokasi',
          'Izin lokasi diperlukan untuk fitur seperti SOS',
          [
            {text: 'Batal', onPress: () => navigation.goBack()},
            {text: 'Beri Izin', onPress: () => getLocationPermission()},
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      setLoadingLocation(false);
      ToastAndroid.show(
        `Terjadi kesalahan: ${error.message}`,
        ToastAndroid.SHORT,
      );
    }
  }

  async function handleUpdateProfile(formData) {
    // confirm password
    const credential = await EncryptedStorage.getItem(
      storage_keys.user_credential,
    );
    if (JSON.parse(credential).password != formData.password) {
      return Alert.alert('', 'Kata sandi tidak benar.');
    }

    // password verified
    let multiPart = new FormData();
    let json = formData;

    for (let p in json) {
      multiPart.append(p, json[p]);
    }

    dispatch(fetchUpdateUserProfile(formData));
  }

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title="Perbarui Profil" onPress={() => navigation.goBack()} />
        {ready && (
          <View style={styles.container}>
            {/* profile region */}
            <FormInput
              name={'nama_lengkap'}
              placeholder={'Nama lengkap..'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'email'}
              placeholder={'Masukan email..'}
              iconName={'gmail'}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'jenis_kelamin'}
              type={'picker'}
              iconName={'gender-male-female'}
              // defaultValue={user_data.gender}
              validate={value => (value == 'Pilih gender' ? false : true)}
              pickerItem={[
                {name: 'Pilih gender', value: 'Pilih gender'},
                {name: 'Laki-laki', value: 'Laki-laki'},
                {name: 'Wanita', value: 'Wanita'},
              ]}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'ukuran_baju'}
              type={'picker'}
              placeholder={'Pilih ukuran baju..'}
              iconName={'tshirt-crew'}
              validate={value => (value == 'Pilih ukuran baju' ? false : true)}
              pickerItem={[
                {name: 'Pilih ukuran baju', value: 'Pilih ukuran baju'},
                {name: 'S', value: 'S'},
                {name: 'M', value: 'M'},
                {name: 'L', value: 'L'},
                {name: 'XL', value: 'XL'},
                {name: 'XXL', value: 'XXL'},
                {name: 'XXXL', value: 'XXXL'},
              ]}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'tempat_lahir'}
              placeholder={'Tempat lahir..'}
              iconName={'calendar'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'tanggal_lahir'}
              type={'date'}
              placeholder={'Tanggal Lahir'}
              iconName={'calendar'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'agama'}
              type={'picker'}
              iconName={'hands-pray'}
              validate={value => (value == 'Pilih agama' ? false : true)}
              pickerItem={[
                {name: 'Pilih agama', value: 'Pilih agama'},
                {name: 'Islam', value: 'Islam'},
                {name: 'Kristen', value: 'Kristen'},
                {name: 'Protestan', value: 'Protestan'},
                {name: 'Hindu', value: 'Hindu'},
                {name: 'Buddha', value: 'Buddha'},
                {name: 'Konghucu', value: 'Konghucu'},
              ]}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'status_nikah'}
              type={'picker'}
              iconName={'account-heart'}
              validate={value =>
                value == 'Pilih status menikah' ? false : true
              }
              pickerItem={[
                {name: 'Pilih status menikah', value: 'Pilih status menikah'},
                {name: 'Lajang', value: 'Lajang'},
                {name: 'Duda', value: 'Duda'},
                {name: 'Janda', value: 'Janda'},
                {name: 'Menikah', value: 'Menikah'},
              ]}
              control={control}
              errors={errors}
            />
            {/* endregion */}

            <Gap height={20} />

            {/* address region */}
            <FormInput
              name={'alamat_lengkap'}
              placeholder={'Alamat lengkap..'}
              iconName={'map-marker-radius'}
              autoCapitalize={'words'}
              multiline
              control={control}
              errors={errors}
            />
            <FormInput
              name={'kelurahan'}
              placeholder={'Kelurahan..'}
              iconName={'map-legend'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'kecamatan'}
              placeholder={'Kecamatan..'}
              iconName={'map-legend'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'provinsi'}
              placeholder={'Provinsi..'}
              iconName={'map-legend'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'kabupaten_kota'}
              placeholder={'Kabupaten/kota..'}
              iconName={'map-legend'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'kodepos'}
              placeholder={'Kodepos..'}
              iconName={'email-fast'}
              keyboardType={'number-pad'}
              control={control}
              errors={errors}
            />
            {/* endregion */}

            <Gap height={20} />

            {/* work region */}
            <FormInput
              name={'pekerjaan'}
              placeholder={'Pekerjaan..'}
              iconName={'badge-account'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'nama_perusahaan'}
              placeholder={'Nama perusahaan..'}
              iconName={'office-building'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'alamat_perusahaan'}
              placeholder={'Alamat perusahaan..'}
              iconName={'office-building-marker'}
              autoCapitalize={'words'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'handphone'}
              placeholder={'No telepon..'}
              iconName={'phone'}
              keyboardType={'number-pad'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'no_whatsapp'}
              placeholder={'No WhatsApp (cth. 08987654321)'}
              iconName={'whatsapp'}
              keyboardType={'number-pad'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'telp_kantor'}
              placeholder={'No telepon kantor..'}
              iconName={'card-account-phone'}
              keyboardType={'number-pad'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'telp_rumah'}
              placeholder={'No telepon rumah..'}
              iconName={'phone-classic'}
              keyboardType={'number-pad'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'sekolah'}
              placeholder={'Sekolah..'}
              iconName={'school'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'no_ktp'}
              placeholder={'Nomor KTP..'}
              iconName={'card-account-details'}
              keyboardType={'number-pad'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'no_sim'}
              placeholder={'No SIM..'}
              iconName={'card-account-details'}
              keyboardType={'number-pad'}
              control={control}
              errors={errors}
            />
            {/* endregion */}

            <Gap height={20} />

            {/* car region */}
            <FormInput
              name={'type_kendaraan'}
              placeholder={'Tipe kendaraan..'}
              iconName={'car-info'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'no_polisi'}
              placeholder={'No Polisi..'}
              iconName={'card-bulleted'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'warna_kendaraan'}
              placeholder={'Warna kendaraan..'}
              iconName={'car-info'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'tahun_kendaraan'}
              placeholder={'Tahun kendaraan..'}
              iconName={'car-info'}
              keyboardType={'number-pad'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'no_chasis'}
              placeholder={'No Chasis..'}
              iconName={'car-info'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'no_engine'}
              placeholder={'No Mesin..'}
              iconName={'car-info'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'tanggal_pajak'}
              placeholder={'Tanggal Pajak'}
              iconName={'car-clock'}
              type={'date'}
              control={control}
              errors={errors}
            />
            {/* endregion */}
            <ButtonAction
              title="Perbarui Lokasi"
              onPress={updateLocation}
              disabled={loadingLocation}
              loading={loadingLocation}
            />

            <Gap height={40} />

            <FormInput
              name={'password'}
              placeholder={'Masukan kata sandi..'}
              iconName={'lock'}
              secureTextEntry
              control={control}
              errors={errors}
            />
            <ButtonSubmit
              onPress={handleSubmit(handleUpdateProfile)}
              title="Perbarui Profil"
              loading={status_user_profile == 'pending'}
              disabled={status_user_profile == 'pending'}
            />
          </View>
        )}
      </ScrollView>
      {!ready && <Text style={styles.textLoading}>Memuat formulir..</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    height: '100%',
  },
  btnResetImg: {
    width: 40,
    height: 40,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    position: 'absolute',
    overflow: 'hidden',
    right: 15,
    top: 15,
  },
  textLoading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'grey',
    flex: 1,
    fontStyle: 'italic',
  },
  textPhotoFieldTitle: {
    position: 'absolute',
    color: 'black',
    fontWeight: '500',
    fontSize: 20,
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  imgContainer: {
    backgroundColor: 'white',
    elevation: 3,
    height: 210,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  headerTitle: {
    fontWeight: '500',
    color: 'black',
    fontSize: 17,
  },
  iconBack: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnBack: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
    elevation: 3,
  },
  headerContainer: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
});
