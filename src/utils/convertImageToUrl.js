import ConvertImageToUrlConsume from '../services/ConvertImageToUrlConsume';

const convertImageToUrl = async image => {
  const formData = new FormData();
  formData.append('image', image);

  const response = await ConvertImageToUrlConsume(formData);

  return response;
};

export default convertImageToUrl;
