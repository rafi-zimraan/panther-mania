import {createSlice} from '@reduxjs/toolkit';
import {fetchUsersLocation} from '../../features/SOS/services/sosServices';

const initialState = {
  status: 'idle',
  users_data: null,
  modal: false,
};

export const sosSlice = createSlice({
  name: 'sos',
  initialState,
  reducers: {
    SetUsersData(state, {payload}) {
      state.users_data = payload;
    },
    SetModal(state, {payload}) {
      state.modal = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsersLocation.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchUsersLocation.fulfilled, state => {
        state.status = 'success';
      })
      .addCase(fetchUsersLocation.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {SetUsersData, SetModal} = sosSlice.actions;

export default sosSlice.reducer;
