import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUsersLocation} from '../../../utils/services';
import {SetUsersData} from '../../../redux/slices/sosSlice';
import {ToastAndroid} from 'react-native';

const showToast = (message, duration = 'SHORT') =>
  ToastAndroid.show(message, ToastAndroid[duration]);

export const fetchUsersLocation = createAsyncThunk(
  'fetchUsersLocation',
  async (arg, {dispatch, getState}) => {
    const {token} = getState().auth;
    try {
      const {data} = await getUsersLocation(token);
      if (Array.isArray(data.data)) dispatch(SetUsersData(data.data));
      else showToast(data?.status);
      return data;
    } catch (error) {
      showToast(error.response.data?.message, 'LONG');
      console.log(error.message);
      return error.message;
    }
  },
);
