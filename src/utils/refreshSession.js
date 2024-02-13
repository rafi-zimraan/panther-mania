import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import {postSignIn} from './services';
import {SetUserToken} from '../redux/slices/authSlice';

export const refreshSession = createAsyncThunk(
  'refreshSession',
  async (arg, {dispatch}) => {
    try {
      const credential = await EncryptedStorage.getItem('user_credential');
      if (credential) {
        const {email, password} = JSON.parse(credential);
        const formData = {email, password, lat: -6.175421, lng: 106.827227};
        const {data} = await postSignIn(formData);
        dispatch(SetUserToken(data.token));
        return data.token;
      } else {
        return null;
      }
    } catch (error) {
      return error.message;
    }
  },
);
