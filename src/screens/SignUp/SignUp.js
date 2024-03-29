import {Alert, Linking, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ButtonSubmit, FormInput} from '../../features/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSignUp} from '../../features/Auth/services/signUpServices';
import {BackgroundImage, Gap, Header} from '../../components';
import Geolocation from '@react-native-community/geolocation';
import {useForm} from 'react-hook-form';
import formExample from './formExample';

export default function SignUp({navigation}) {
  const dispatch = useDispatch();
  const {status_signup} = useSelector(state => state.auth);
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    // defaultValues: formExample, // use for testing
  });

  const [ready, setReady] = useState(false);
  setTimeout(() => setReady(true), 1000); // "lazy render"

  useEffect(() => {
    getLocationPermission();
  }, []);

  const [coords, setCoords] = useState({lat: null, lng: null});
  async function getLocationPermission() {
    Geolocation.requestAuthorization(
      () => {
        Geolocation.getCurrentPosition(
          ({coords}) => {
            const {longitude, latitude} = coords;
            setCoords({lat: latitude, lng: longitude});
          },
          error => {
            console.log('ERROR:', error);
          },
          {enableHighAccuracy: true},
        );
      },
      error => {
        if (error.message == 'Location permission was not granted.') {
          Alert.alert(
            'Izin Lokasi',
            'Izin lokasi diperlukan untuk fitur seperti SOS.',
            [
              {text: 'Batal', onPress: () => navigation.goBack()},
              {text: 'Beri Izin', onPress: () => Linking.openSettings()},
            ],
            {cancelable: false},
          );
        }
      },
    );
  }

  async function submitRegister(formData) {
    if (!coords.lat) {
      return getLocationPermission();
    }
    let multiPart = new FormData();
    let json = {...formData, lat: coords.lat, lng: coords.lng};

    for (let p in json) {
      multiPart.append(p, json[p]);
    }

    console.log(multiPart);

    dispatch(fetchSignUp({multiPart, navigation}));
  }

  const exsemple = {
    _parts: [
      ['profile', [Object]],
      ['ktp', [Object]],
      ['sim', [Object]],
      ['stnk', [Object]],
      ['bukti_tf', [Object]],
      ['nama_lengkap', 'testing'],
      ['email', 'testing@gmail.com'],
      ['password', '1234567890'],
      ['password_confirmation', '1234567890'],
      ['jenis_kelamin', 'Laki-laki'],
      ['ukuran_baju', 'XL'],
      ['tempat_lahir', 'fdfdfds'],
      ['tanggal_lahir', '2023-10-17'],
      ['agama', 'Kristen'],
      ['status_nikah', 'Lajang'],
      ['alamat_lengkap', 'dfdfdfds'],
      ['kelurahan', 'fsdfdsfds'],
      ['kecamatan', 'dfdfdfdsfd'],
      ['provinsi', 'dfdfsdfsd'],
      ['kabupaten_kota', 'dfdfsdf'],
      ['kodepos', '6565655'],
      ['pekerjaan', 'dfdfdsfdsfd'],
      ['nama_perusahaan', 'fdfdsfdfsdds'],
      ['alamat_perusahaan', 'fdfdfdsfsdf'],
      ['handphone', '43242343243'],
      ['no_whatsapp', '099778566'],
      ['telp_kantor', '4544443'],
      ['telp_rumah', '445454543'],
      ['sekolah', 'cxvcvcv'],
      ['no_ktp', '4322352352'],
      ['no_sim', '3243243'],
      ['type_kendaraan', 'vdvdcxv'],
      ['no_polisi', '34334'],
      ['warna_kendaraan', 'fvcxvvc'],
      ['tahun_kendaraan', '453223'],
      ['no_chasis', 'dfdsfds'],
      ['no_engine', '32343'],
      ['tanggal_pajak', '2023-10-17'],
      ['lat', -7.7123683],
      ['lng', 110.3779852],
    ],
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <Header title="Register" onPress={() => navigation.goBack()} />
        {ready && (
          <View style={styles.container}>
            {/* image region */}
            <FormInput
              name={'profile'}
              title={'Foto Profil'}
              type={'image'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'ktp'}
              title={'Foto KTP'}
              type={'image'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'sim'}
              title={'Foto SIM'}
              type={'image'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'stnk'}
              title={'Foto STNK'}
              type={'image'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'bukti_tf'}
              title={'Foto Bukti Transfer'}
              type={'image'}
              control={control}
              errors={errors}
            />
            {/* endregion */}

            <Gap height={20} />

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
              name={'password'}
              placeholder={'Masukan kata sandi..'}
              iconName={'lock'}
              secureTextEntry
              control={control}
              errors={errors}
            />
            <FormInput
              name={'password_confirmation'}
              placeholder={'Masukan ulang kata sandi..'}
              iconName={'lock'}
              secureTextEntry
              control={control}
              errors={errors}
            />
            <FormInput
              name={'jenis_kelamin'}
              type={'picker'}
              iconName={'gender-male-female'}
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
              placeholder={'WhatsApp (cth. 08987654321)'}
              iconName={'whatsapp'}
              keyboardType={'number-pad'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'telp_kantor'}
              placeholder={'No telp kantor..'}
              iconName={'card-account-phone'}
              keyboardType={'number-pad'}
              control={control}
              errors={errors}
            />
            <FormInput
              name={'telp_rumah'}
              placeholder={'No telp rumah..'}
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
              placeholder={'No KTP..'}
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
            <Gap height={10} />
            <ButtonSubmit
              onPress={handleSubmit(submitRegister)}
              title="Daftar"
              loading={status_signup == 'pending'}
              disabled={status_signup == 'pending'}
            />
            <Gap height={20} />
          </View>
        )}
      </ScrollView>
      {!ready && <Text style={styles.textLoading}>Memuat formulir..</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
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
