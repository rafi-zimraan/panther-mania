import {postFormData} from '..';

const StoreOrderApi = params => {
  return postFormData('/api/storeorder', params);
};

export {StoreOrderApi};
