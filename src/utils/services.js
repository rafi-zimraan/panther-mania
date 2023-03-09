import axios from 'axios';
import {API_KEY} from '@env';

const config = access => ({
  header: {
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
  axios.post(`${API_KEY}/auth/signup`, formData, configMultipart());
export const postSignIn = formData =>
  axios.post(`${API_KEY}/auth/signin`, formData, config());
export const getUserData = (id, access) =>
  axios.get(`${API_KEY}/dataprofiles/${id}`, config(access));
