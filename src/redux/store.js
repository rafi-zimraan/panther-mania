import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import utilsSlice from './slices/utilsSlice';
import agendaSlice from './slices/agendaSlice';
import pantherProductSlice from './slices/pantherProductSlice';
import sosSlice from './slices/sosSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    utils: utilsSlice,
    agenda: agendaSlice,
    panther_product: pantherProductSlice,
    save_our_souls: sosSlice,
  },
});
