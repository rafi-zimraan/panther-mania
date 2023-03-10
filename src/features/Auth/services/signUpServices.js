import {createAsyncThunk} from '@reduxjs/toolkit';
import {SetUserCredential} from '../../../redux/slices/authSlice';
import {getUserData, postSignUp} from '../../../utils/services';

// const handleCatch

export const fetchSignUp = createAsyncThunk(
  'fetchSignUp',
  async (multiPart, {dispatch}) => {
    try {
      const {data: response} = await postSignUp(multiPart);
      const {data, API, access_token} = response;
      if (data == 'User Berhasil Registrasi') {
        const {data} = await getUserData(API.id, access_token);
        dispatch(SetUserCredential({access_token, user_data: data.API[0]}));
      } else console.log('gagal sign up:', response);
      return response;
    } catch (error) {
      console.log('error masbro:', error.message);
      return error.message;
    }
  },
);
