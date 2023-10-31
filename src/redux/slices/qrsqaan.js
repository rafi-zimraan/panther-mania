import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  modal: false,
};

export const qrsqaan = createSlice({
  name: 'modal Qr',
  initialState,
  reducers: {
    SetModal(state, {payload}) {
      state.modal = payload;
    },
  },
});

export const {SetModal} = qrsqaan.actions;

export default qrsqaan.reducer;
