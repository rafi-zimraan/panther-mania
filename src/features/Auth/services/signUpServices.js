import {createAsyncThunk} from '@reduxjs/toolkit';
import {SetUserCredential} from '../../../redux/slices/authSlice';
import {getUserData, postSignIn, postSignUp} from '../../../utils/services';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ToastAndroid} from 'react-native';

const showToast = (message, duration = 'SHORT') =>
  ToastAndroid.show(message, ToastAndroid[duration]);

const catchError = error => {
  showToast(`Terjadi kesalahan: ${error.message}`);
  console.log(error);
};

export const fetchSignUp = createAsyncThunk(
  'fetchSignUp',
  async ({multiPart, navigation}, {dispatch}) => {
    try {
      const {data: response} = await postSignUp(multiPart, navigation);
      const {message} = response;
      if (message == 'Data Member berhasil disimpan. Silahkan login') {
        // 3, 11 & 16 are index position for email, password & nama_lengkap
        const email = multiPart._parts[3][1],
          password = multiPart._parts[16][1],
          fullName = multiPart._parts[11][1];

        const {data: dataSignIn} = await postSignIn({email, password});
        if (
          dataSignIn?.message ==
          'Maaf status Anda Unregister, Silahkan Hubungi Admin'
        )
          return showToast('Menunggu persetujuan registrasi');
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
