import {postFormData} from '.';

const SignInApi = params => {
  return postFormData('/api/auth/signin', params);
};

export {SignInApi};
