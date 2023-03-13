import axios from 'axios';
import {API_KEY} from '@env';

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
  axios.post(`${API_KEY}/register`, formData, config());
export const postSignIn = formData =>
  axios.post(`${API_KEY}/auth`, formData, config());
export const getUserData = access => axios.get(`${API_KEY}/me`, config(access));
export const postSignOut = access =>
  axios.post(`${API_KEY}/logout`, config(access));
