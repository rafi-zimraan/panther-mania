import {createAsyncThunk} from '@reduxjs/toolkit';
import {postUpdateUserProfile} from '../../../utils/services';
import {ToastAndroid} from 'react-native';

export const fetchUpdateUserProfile = createAsyncThunk(
  'fetchUpdateUserProfile',
  async (formData, {dispatch, getState}) => {
    try {
      const {token} = getState().auth;
      const {data} = await postUpdateUserProfile(formData, token);
      console.log(data);
      ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      return data;
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        `Terjadi kesalahan: ${error.message}`,
        ToastAndroid.SHORT,
      );
      return error.message;
    }
  },
);
