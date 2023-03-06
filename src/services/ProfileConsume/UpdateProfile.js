import {postFormData} from '..';

const UpdateProfileApi = (id, params) => {
  return postFormData(`/api/updateprofile/${id}`, params);
};

export {UpdateProfileApi};
