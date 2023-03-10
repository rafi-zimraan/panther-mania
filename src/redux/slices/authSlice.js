import {createSlice} from '@reduxjs/toolkit';
import {fetchSignIn} from '../../features/Auth/services/signInServices';
import {fetchSignUp} from '../../features/Auth/services/signUpServices';

const defaultUserData = {
  nama_lengkap: '',
  email: '',
  jenis_kelamin: '',
  ukuran_baju: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  agama: '',
  status_menikah: '',
  alamat_lengkap: '',
  kelurahan: '',
  kecamatan: '',
  provinsi: '',
  kabupaten_kota: '',
  no_telp: '',
  no_whatsapp: '',
  no_ktp: '',
  no_sim: '',
  type_kendaraan: '',
  tahun_kendaraan: '',
  no_polisi: '',
  warna_kendaraan: '',
  no_chasis: '',
  no_engine: '',
  tanggal_pajak: '',
  lat: '',
  lng: '',
  id: null,
};

const initialState = {
  status_signup: 'idle',
  status_signin: 'idle',
  token: null,
  user_data: defaultUserData,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetUserToken(state, action) {
      state.token = action.payload;
    },
    SetUserData(state, action) {
      state.user_data = action.payload;
    },
    SetUserCredential(state, action) {
      state.token = action.payload.access_token;
      state.user_data = action.payload.user_data;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSignUp.pending, state => {
        state.status_signup = 'pending';
      })
      .addCase(fetchSignUp.fulfilled, state => {
        state.status_signup = 'success';
      })
      .addCase(fetchSignUp.rejected, state => {
        state.status_signup = 'failed';
      });
    builder
      .addCase(fetchSignIn.pending, state => {
        state.status_signin = 'pending';
      })
      .addCase(fetchSignIn.fulfilled, state => {
        state.status_signin = 'success';
      })
      .addCase(fetchSignIn.rejected, state => {
        state.status_signin = 'failed';
      });
  },
});

export const {SetUserToken, SetUserData, SetUserCredential} = authSlice.actions;

export default authSlice.reducer;
