import {createSlice} from '@reduxjs/toolkit';
import {
  fetchAgenda,
  fetchJoinAgenda,
} from '../../features/Agenda/services/agendaServices';

const initialState = {
  status: 'idle',
  status_join: 'idle',
  data: null,
};

export const agendaSlice = createSlice({
  name: 'agenda',
  initialState,
  reducers: {
    SetDataAgenda(state, {type, payload}) {
      state.data = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAgenda.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchAgenda.fulfilled, state => {
        state.status = 'success';
      })
      .addCase(fetchAgenda.rejected, state => {
        state.status = 'failed';
      });
    builder
      .addCase(fetchJoinAgenda.pending, state => {
        state.status_join = 'pending';
      })
      .addCase(fetchJoinAgenda.fulfilled, state => {
        state.status_join = 'success';
      })
      .addCase(fetchJoinAgenda.rejected, state => {
        state.status_join = 'failed';
      });
  },
});

export const {SetDataAgenda} = agendaSlice.actions;

export default agendaSlice.reducer;
