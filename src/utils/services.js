import axios from 'axios';
import {API_SINGIN, API_SIGNUP, API_SIGNOUT, API_USER_DATA} from '@env';

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

export const postSignUp = formData =>
  axios.post(`${API_SIGNUP}`, formData, configMultipart());
export const postSignIn = formData =>
  axios.post(`${API_SINGIN}`, formData, config());
export const getUserData = access =>
  axios.get(`${API_USER_DATA}`, config(access));
export const postSignOut = access =>
  axios.post(`${API_SIGNOUT}`, config(access));
