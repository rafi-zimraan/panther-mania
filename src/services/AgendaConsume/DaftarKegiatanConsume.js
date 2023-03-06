import {postFormData} from '..';

const DaftarKegiatanConsume = params => {
  return postFormData('/api/agendak/daftar', params);
};

export {DaftarKegiatanConsume};
