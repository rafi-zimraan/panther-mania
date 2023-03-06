import {postFormData} from '.';

const SignUpApi = params => {
  return postFormData('/api/auth/signup', params);
};

export {SignUpApi};
