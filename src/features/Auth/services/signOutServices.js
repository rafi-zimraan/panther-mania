import {createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ResetUserCredential} from '../../../redux/slices/authSlice';
import {postSignOut} from '../../../utils/services';

export const fetchSignOut = createAsyncThunk(
  'fetchSignOut',
  async (navigation, {getState, dispatch}) => {
    const {token} = getState().auth;
    try {
      const {data} = await postSignOut(token);
      await EncryptedStorage.removeItem('user_credential');
      dispatch(ResetUserCredential());
      navigation.reset({
        index: 0,
        routes: [{name: 'AuthMethod'}],
      });
      return data;
    } catch (error) {
      return error.message;
    }
  },
);
