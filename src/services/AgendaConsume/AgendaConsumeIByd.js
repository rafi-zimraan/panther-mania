import {get} from '..';

const AgendaConsumeApiById = id => {
  return get(`/api/agendak/${id}`);
};

export {AgendaConsumeApiById};
