import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAgenda, postJoinAgenda} from '../../../utils/services';
import {ToastAndroid} from 'react-native';
import {SetDataAgenda} from '../../../redux/slices/agendaSlice';

const showToast = (message, duration = 'SHORT') =>
  ToastAndroid.show(message, ToastAndroid[duration]);

export const fetchAgenda = createAsyncThunk(
  'fetchAgenda',
  async (arg, {dispatch}) => {
    try {
      const {data} = await getAgenda();
      dispatch(SetDataAgenda(data.data.data));
      return data;
    } catch (error) {
      console.log(error);
      showToast(`Terjadi kesalahan: ${error.response.data?.message}`);
      return error.message;
    }
  },
);

export const fetchJoinAgenda = createAsyncThunk(
  'fetchJoinAgenda',
  async (formData, {dispatch, getState}) => {
    const {dewasa, anak, kendaraan, agenda, member, token} = formData;
    const form = {dewasa, anak, kendaraan, agenda, member};
    try {
      const {data} = await postJoinAgenda(form, agenda, token);
      showToast(data.message);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      showToast(`Terjadi kesalahan: ${error.response.data?.message}`);
      return error.message;
    }
  },
);
