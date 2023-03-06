import {post} from '.';

const LogoutApi = () => {
  return post('/api/auth/logout');
};

export {LogoutApi};
