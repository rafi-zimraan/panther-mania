import axios from 'axios';

const host = 'https://panther-mania.id/api/v1';

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
  axios.post(`${host}/register`, formData, configMultipart());
export const postSignIn = formData => axios.post(`${host}/auth`, formData);
export const getUserData = access => axios.get(`${host}/me`, config(access));
export const postSignOut = access =>
  axios.post(`${host}/logout`, config(access));
export const postUpdateUserProfile = (formData, access) =>
  axios.put(`${host}/update`, formData, config(access));

// Agenda
export const getAgenda = () => axios.get(`${host}/agenda`, config());
export const postJoinAgenda = (formData, id, access) =>
  axios.post(`${host}/agenda/${id}`, formData, config(access));

// Panther Product
export const getPantherProduct = () => axios.get(`${host}/products`, config());

// SOS
export const getUsersLocation = access =>
  axios.get(`${host}/sos`, config(access));

// QRCODE
export const postLoginQRCode = rfid =>
  axios.post(`${host}/login_rfid`, {rfid}, config());

// //   Riwayat Order
// export const riwayatorder = access =>
//   axios.get(`${host}/riwayat_order`, config(access));
