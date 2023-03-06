import {get} from '..';

const ProductApiById = id => {
  return get(`/api/products/${id}`);
};

export {ProductApiById};
