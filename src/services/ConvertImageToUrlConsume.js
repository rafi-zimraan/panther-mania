import {postFormDataSpecialForImgBB} from '.';

const ConvertImageToUrlConsume = params => {
  return postFormDataSpecialForImgBB(
    '/1/upload?key=ec7895707c392676d976d77a1c7c693c',
    params,
  );
};

export default ConvertImageToUrlConsume;
