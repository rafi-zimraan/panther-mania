import {createAsyncThunk} from '@reduxjs/toolkit';
import {SetUserCredential} from '../../../redux/slices/authSlice';
import {getUserData, postSignIn, postSignUp} from '../../../utils/services';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Alert, ToastAndroid} from 'react-native';

const showToast = (message, duration = 'SHORT') =>
  ToastAndroid.show(message, ToastAndroid[duration]);

const catchError = error => {
  showToast(`Terjadi kesalahan: ${error.message}`);
  console.log(error);
};

const form = {
  _parts: [
    ['agama', 'Islam'],
    ['alamat_lengkap', 'Alamat lengkap'],
    ['alamat_perusahaan', 'alamat perusahaan'],
    ['email', 'testing102@gmail.com'],
    ['handphone', '0823475716374'],
    ['jenis_kelamin', 'Laki-laki'],
    ['kabupaten_kota', 'kabupaten/kota'],
    ['kecamatan', 'kecamatan'],
    ['kelurahan', 'keluarahan'],
    ['kodepos', '55772'],
    ['lat', -7.9964723],
    ['lng', 110.2955627],
    ['nama_lengkap', 'Nama Lengkap'],
    ['nama_perusahaan', 'nama perusahaan'],
    ['no_chasis', 'rrr33444werrr'],
    ['no_engine', 'ggggghhhhh3333ww3'],
    ['no_ktp', '222333111000848'],
    ['no_polisi', 'd3455egh'],
    ['no_sim', '987484848493999'],
    ['no_whatsapp', '085157439660'],
    ['password', 'rahasia123'],
    ['password_confirmation', 'rahasia123'],
    ['pekerjaan', 'Programmer'],
    ['provinsi', 'provinsi'],
    ['sekolah', 'sekolah'],
    ['status_nikah', 'Menikah'],
    ['tahun_kendaraan', '2202'],
    ['tanggal_lahir', '2023-04-01'],
    ['tanggal_pajak', '2023-04-26'],
    ['telp_kantor', '082347583749'],
    ['telp_rumah', '084758237483'],
    ['tempat_lahir', 'Bandung'],
    ['type_kendaraan', 'tipe kendaraan'],
    ['ukuran_baju', 'M'],
    ['warna_kendaraan', 'warna kendaraan'],
    ['profile', [Object]],
    ['ktp', [Object]],
    ['bukti_tf', [Object]],
    ['sim', [Object]],
    ['stnk', [Object]],
  ],
};

export const fetchSignUp = createAsyncThunk(
  'fetchSignUp',
  async ({multiPart, navigation}, {dispatch}) => {
    try {
      const {data: response} = await postSignUp(multiPart, navigation);
      const {message} = response;
      console.log('register:', response);

      if (message == 'Data Member berhasil disimpan. Silahkan login') {
        // 3, 20 & 12 are index position for email, password & nama_lengkap
        const email = multiPart._parts[3][1],
          password = multiPart._parts[20][1],
          fullName = multiPart._parts[12][1],
          lat = multiPart._parts[10][1],
          lng = multiPart._parts[11][1];

        const formSignIn = {email, password, lat, lng};
        const {data: dataSignIn} = await postSignIn(formSignIn);
        if (
          dataSignIn?.message ==
          'Maaf status Anda Unregister, Silahkan Hubungi Admin'
        )
          return Alert.alert(
            'Registrasi Berhasil',
            'Menunggu persetujuan registrasi. Harap hubungi admin yang bersangkutan.',
          );
        console.log('sign in:', dataSignIn);

        await EncryptedStorage.setItem(
          'user_credential',
          JSON.stringify({email, password}),
        );
        const {data: dataUser} = await getUserData(dataSignIn.token);
        dispatch(
          SetUserCredential({
            token: dataSignIn.token,
            user_data: dataUser.auth,
          }),
        );
        showToast(`Selamat datang, ${fullName}`);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        }, 500);
      } else {
        console.log(response);
        showToast(`Terjadi kesalahan: ${response.message}`);
      }
      return response;
    } catch (error) {
      catchError(error);
      return error.message;
    }
  },
);
