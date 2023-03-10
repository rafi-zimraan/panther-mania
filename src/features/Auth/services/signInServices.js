import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import {SetUserCredential} from '../../../redux/slices/authSlice';
import {getUserData, postSignIn} from '../../../utils/services';

export const fetchSignIn = createAsyncThunk(
  'fetchSignIn',
  async (params, {dispatch}) => {
    const {email, password, navigation, splash} = params;
    try {
      const {data: response} = await postSignIn({email, password});
      if (response.data == 'berhasil login!') {
        const {API, access_token} = response;
        const {data} = await getUserData(API.id, access_token);
        dispatch(SetUserCredential({access_token, user_data: data.API[0]}));
        await EncryptedStorage.setItem(
          'user_credential',
          JSON.stringify({email, password}),
        );
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else splash && navigation.replace('AuthMethod');
      return response;
    } catch (error) {
      console.log('error masbro:', error);
      splash && navigation.replace('AuthMethod');
      return error.message;
    }
  },
);
