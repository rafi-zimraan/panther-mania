import {get} from '..';

const ProfileApiById = id => {
  return get(`/api/dataprofiles/${id}`);
};

export {ProfileApiById};
