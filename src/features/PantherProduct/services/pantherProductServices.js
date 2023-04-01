import {createAsyncThunk} from '@reduxjs/toolkit';
import {SetDataPantherProduct} from '../../../redux/slices/pantherProductSlice';
import {getPantherProduct} from '../../../utils/services';

export const fetchProduct = createAsyncThunk(
  'fetchProduct',
  async (arg, {dispatch}) => {
    try {
      const {data} = await getPantherProduct();
      dispatch(SetDataPantherProduct(data.data.data));
      return data;
    } catch (error) {
      return error.message;
    }
  },
);
