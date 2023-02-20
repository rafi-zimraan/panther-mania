import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user_data: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SetUserToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const {SetUserToken} = authSlice.actions;

export default authSlice.reducer;
