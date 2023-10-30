import {createSlice} from '@reduxjs/toolkit';
import {fetchProduct} from '../../features/PantherProduct/services/pantherProductServices';

const initialState = {
  status: 'idle',
  data: null,
};

export const pantherProductSlice = createSlice({
  name: 'panther product',
  initialState,
  reducers: {
    SetDataPantherProduct(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const {SetDataPantherProduct} = pantherProductSlice.actions;

export default pantherProductSlice.reducer;
