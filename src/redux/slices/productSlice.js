import {createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    status: 'idle',
    products: [],
  },
  reducers: {
    SetProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const {SetProducts} = productSlice.actions;

export default productSlice.reducer;
