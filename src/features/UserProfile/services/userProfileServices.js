import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUserData, postUpdateUserProfile} from '../../../utils/services';
import {ToastAndroid} from 'react-native';
import {SetUserCredential} from '../../../redux/slices/authSlice';

const showToast = (message, duration = 'SHORT') =>
  ToastAndroid.show(message, ToastAndroid[duration]);

export const fetchUpdateUserProfile = createAsyncThunk(
  'fetchUpdateUserProfile',
  async (formData, {dispatch, getState}) => {
    const {token} = getState().auth;
    try {
      const {data} = await postUpdateUserProfile(formData, token);
      if (data?.message == 'Data Member berhasil diubah.') {
        const {data: dataUser} = await getUserData(token);
        dispatch(SetUserCredential({token, user_data: dataUser.auth}));
        showToast('Profil berhasil diperbarui');
      } else {
        showToast(`Terjadi kesalahan: ${data?.message}`);
      }
      return data;
    } catch (error) {
      console.log(error.response.data);
      showToast(`Terjadi kesalahan: ${error.message}`, 'LONG');
      return error.message;
    }
  },
);
