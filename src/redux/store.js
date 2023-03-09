import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import utilsSlice from './slices/utilsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    utils: utilsSlice,
  },
});
