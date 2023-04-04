import {createSlice} from '@reduxjs/toolkit';
import {fetchUsersLocation} from '../../features/SOS/services/sosServices';

const initialState = {
  status: 'idle',
  users_data: null,
  modal: false,
  status_permissions: 'denied',
  trigger_map: true,
  coords: {
    longitude: 106.82719,
    latitude: -6.175395,
  },
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
    SetStatusPermission(state, {payload}) {
      state.status_permissions = payload;
    },
    SetTriggerMap(state, {payload}) {
      state.trigger_map = payload;
    },
    SetCoordinates(state, {payload}) {
      state.coords = payload;
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

export const {
  SetUsersData,
  SetModal,
  SetStatusPermission,
  SetTriggerMap,
  SetCoordinates,
} = sosSlice.actions;

export default sosSlice.reducer;
