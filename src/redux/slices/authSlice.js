import {createSlice} from '@reduxjs/toolkit';
import {fetchSignIn} from '../../features/Auth/services/signInServices';
import {fetchSignOut} from '../../features/Auth/services/signOutServices';
import {fetchSignUp} from '../../features/Auth/services/signUpServices';

const defaultUserData = {
  id: 2279,
  uuid: '967220230313091628',
  user_id: 3065,
  rfid: '',
  nama_lengkap: '',
  email: '',
  gender: '',
  nomor: '',
  korwil_uuid: '',
  korwil: '',
  ukuran_baju: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  agama: '',
  status_nikah: '',
  alamat: '',
  kelurahan: '',
  kecamatan: '',
  provinsi: '',
  kabupaten: '',
  kodepos: '',
  no_whatsapp: '',
  handphone: '',
  telp_rumah: '',
  telp_kantor: '',
  pekerjaan: '',
  nama_perusahaan: '',
  alamat_perusahaan: '',
  sekolah: '',
  hobby: '',
  ktp: '',
  sim: '',
  panther_type: '',
  panther_tahun: '',
  panther_nopol: '',
  panther_warna: '',
  panther_no_chasis: '',
  panther_no_engine: '',
  panther_pajak: '',
  aktif: 0,
  progress: 0,
};

const initialState = {
  status_signup: 'idle',
  status_signin: 'idle',
  status_signout: 'idle',
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
      state.token = action.payload.token;
      state.user_data = action.payload.user_data;
    },
    ResetUserCredential(state, action) {
      state.token = null;
      state.user_data = defaultUserData;
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
    builder
      .addCase(fetchSignOut.pending, state => {
        state.status_signout = 'pending';
      })
      .addCase(fetchSignOut.fulfilled, state => {
        state.status_signout = 'success';
      })
      .addCase(fetchSignOut.rejected, state => {
        state.status_signout = 'failed';
      });
  },
});

export const {
  SetUserToken,
  SetUserData,
  SetUserCredential,
  ResetUserCredential,
} = authSlice.actions;

export default authSlice.reducer;
