import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  modal_global: false,
};

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    SetModalGlobal(state, action) {
      state.modal_global = action.payload;
    },
  },
});

export const {SetModalGlobal} = utilsSlice.actions;

export default utilsSlice.reducer;
