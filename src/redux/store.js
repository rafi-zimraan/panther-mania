import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import utilsSlice from './slices/utilsSlice';
import agendaSlice from './slices/agendaSlice';
import pantherProductSlice from './slices/pantherProductSlice';
import sosSlice from './slices/sosSlice';
import qrsqaan from './slices/qrsqaan';

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Menonaktifkan serializable check
    }),
  reducer: {
    auth: authSlice,
    utils: utilsSlice,
    agenda: agendaSlice,
    panther_product: pantherProductSlice,
    save_our_souls: sosSlice,
    sqaan_QR: qrsqaan,
  },
});
