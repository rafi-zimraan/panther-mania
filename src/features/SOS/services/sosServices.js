import {createAsyncThunk} from '@reduxjs/toolkit';
import {getUsersLocation} from '../../../utils/services';
import {SetUsersData} from '../../../redux/slices/sosSlice';
import {ToastAndroid} from 'react-native';
import {refreshSession} from '../../../utils/refreshSession';

const showToast = (message, duration = 'SHORT') =>
  ToastAndroid.show(message, ToastAndroid[duration]);

export const fetchUsersLocation = createAsyncThunk(
  'fetchUsersLocation',
  async (arg, {dispatch, getState}) => {
    const {token} = getState().auth;
    try {
      const {data} = await getUsersLocation(token);
      if (Array.isArray(data.data) && data.data?.length != 0) {
        const users_data = data.data?.filter(v => v.lat != '' && v.lng != '');
        dispatch(SetUsersData(users_data));
      } else if (data.status == 'Token is Expired') {
        await dispatch(refreshSession());
        dispatch(fetchUsersLocation());
      } else showToast(data?.status);
      return data;
    } catch (error) {
      showToast(error.response.data?.message, 'LONG');
      console.log(error.message);
      return error.message;
    }
  },
);
