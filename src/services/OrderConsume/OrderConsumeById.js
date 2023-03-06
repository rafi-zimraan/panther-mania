import {get} from '..';

const OrderConsumeByIdApi = id => {
  return get(`/api/agendak/${id}`);
};

export {OrderConsumeByIdApi};
