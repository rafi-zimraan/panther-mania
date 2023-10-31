import {createAsyncThunk} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SetUserCredential, SetQrLoading} from '../../../redux/slices/authSlice';
import {postLoginQRCode, getUserData} from '../../../utils/services';

export const signQrCode = createAsyncThunk(
  'signQrCode',
  async (params, {dispatch}) => {
    const {navigation, rfid} = params;
    try {
      const {data} = await postLoginQRCode(rfid);
      if (data.message == 'Berhasil login!') {
        const {token} = data;
        const dataUser = await getUserData(token);
        dispatch(SetUserCredential({token, user_data: dataUser.data.auth}));
        await EncryptedStorage.setItem('rfid', JSON.stringify(rfid));
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
        ToastAndroid.show('Selamat Datang!', ToastAndroid.SHORT);
      } else {
        dispatch(SetQrLoading(false));
        ToastAndroid.show(data?.message, ToastAndroid.LONG);
      }
      return data;
    } catch (error) {
      console.log('error masbro:', error);
      ToastAndroid.show(error?.message, ToastAndroid.SHORT);
      splash && navigation.replace('AuthMethod');
      return error.message;
    }
  },
);
