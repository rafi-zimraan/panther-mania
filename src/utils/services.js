import axios from 'axios';
import {
  API_SIGNIN,
  API_SIGNUP,
  API_SIGNOUT,
  API_USER_DATA,
  API_USER_DATA_UPDATE,
} from '@env';

const config = access => ({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${access}`,
  },
});

const configMultipart = access => ({
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: `Bearer ${access}`,
  },
});

// User auth
export const postSignUp = formData =>
  axios.post(
    'https://panther-mania.id/api/v1/register',
    formData,
    configMultipart(),
  );
export const postSignIn = formData =>
  axios.post('https://panther-mania.id/api/v1/auth', formData);
export const getUserData = access =>
  axios.get('https://panther-mania.id/api/v1/me', config(access));
export const postSignOut = access =>
  axios.post('https://panther-mania.id/api/v1/logout', config(access));
export const postUpdateUserProfile = (formData, access) =>
  axios.put(
    'https://panther-mania.id/api/v1/update',
    formData,
    configMultipart(access),
  );
