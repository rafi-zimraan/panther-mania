import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SetUserCredential} from '../../../redux/slices/authSlice';
import {getUserData, postSignIn} from '../../../utils/services';
import {ToastAndroid} from 'react-native';

export const fetchSignIn = createAsyncThunk(
  'fetchSignIn',
  async (params, {dispatch}) => {
    const {email, password, navigation, lat, lng, splash} = params;
    try {
      const {data: response} = await postSignIn({email, password, lat, lng});
      if (response.message == 'Berhasil login!') {
        const {token} = response;
        const {data: dataUser} = await getUserData(token);
        dispatch(SetUserCredential({token, user_data: dataUser.auth}));
        await EncryptedStorage.setItem(
          'user_credential',
          JSON.stringify({email, password}),
        );
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else {
        ToastAndroid.show(response?.message, ToastAndroid.SHORT);
        splash && navigation.replace('AuthMethod');
      }
      console.log(response);
      return response;
    } catch (error) {
      console.log('error masbro:', error);
      ToastAndroid.show(error?.message, ToastAndroid.SHORT);
      splash && navigation.replace('AuthMethod');
      return error.message;
    }
  },
);
