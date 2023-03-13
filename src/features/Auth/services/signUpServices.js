import {createAsyncThunk} from '@reduxjs/toolkit';
import {SetUserCredential} from '../../../redux/slices/authSlice';
import {getUserData, postSignIn, postSignUp} from '../../../utils/services';
import EncryptedStorage from 'react-native-encrypted-storage';
// const handleCatch

export const fetchSignUp = createAsyncThunk(
  'fetchSignUp',
  async ({formData, navigation}, {dispatch}) => {
    try {
      const {data: response} = await postSignUp(formData);
      const {message} = response;
      if (message == 'Data Member berhasil disimpan. Silahkan login') {
        const {email, password} = formData;
        const {data: dataSignIn} = await postSignIn({email, password});
        await EncryptedStorage.setItem(
          'user_credential',
          JSON.stringify({email, password}),
        );
        const {data: dataUser} = await getUserData(dataSignIn.token);
        dispatch(
          SetUserCredential({
            token: dataSignIn.token,
            user_data: dataUser.auth,
          }),
        );
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } else console.log('gagal sign up:', response);
      return response;
    } catch (error) {
      console.log('error masbro:', error.message);
      return error.message;
    }
  },
);
