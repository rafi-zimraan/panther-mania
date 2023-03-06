import AsyncStorage from '@react-native-async-storage/async-storage';

const AppConfig = {
  baseUrl: 'https://panthermania.lapaksiswa.com',
};

const get = async (url = '', params = {}) => {
  let queryString = new URLSearchParams();
  for (let key in params) {
    queryString.append(key, params[key]);
  }

  let newUrl =
    queryString.toString() != ''
      ? `${AppConfig.baseUrl}${url}?${queryString.toString()}`
      : `${AppConfig.baseUrl}${url}`;

  console.log('ENDPOINT...', newUrl);

  let token = await AsyncStorage.getItem('token');
  console.log('token', token);
  let result =
    token != null
      ? fetch(newUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(resJson => {
            return resJson;
          })
          .catch(err => {
            return err;
          })
      : fetch(newUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(resJson => {
            return resJson;
          })
          .catch(err => {
            return err;
          });
  return result;
};

const post = async (url = '', params = {}) => {
  let newUrl = `${AppConfig.baseUrl}${url}`;
  console.log('ENDPOINT...', newUrl);

  let token = await AsyncStorage.getItem('token');
  console.log('token', token);
  let result =
    token != null
      ? fetch(newUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        })
          .then(res => res.json())
          .then(resJson => {
            return resJson;
          })
          .catch(err => {
            return err;
          })
      : fetch(newUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        })
          .then(res => res.json())
          .then(resJson => {
            return resJson;
          })
          .catch(err => {
            return err;
          });
  return result;
};
const put = async (url = '', params = {}) => {
  let newUrl = `${AppConfig.baseUrl}${url}`;
  console.log('ENDPOINT...', newUrl);

  let token = await AsyncStorage.getItem('token');
  console.log('token', token);
  let result =
    token != null
      ? fetch(newUrl, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(params),
        })
          .then(res => res.json())
          .then(resJson => {
            return resJson;
          })
          .catch(err => {
            return err;
          })
      : fetch(newUrl, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        })
          .then(res => res.json())
          .then(resJson => {
            return resJson;
          })
          .catch(err => {
            return err;
          });
  return result;
};

const postFormDataSpecialForImgBB = async (
  url = '',
  params = new FormData(),
) => {
  let newUrl = `https://api.imgbb.com${url}`;
  console.log('ENDPOINT...', newUrl);

  let result = fetch(newUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    body: params,
  })
    .then(res => res.json())
    .then(resJson => {
      return resJson;
    })
    .catch(err => {
      return err;
    });
  return result;
};

const postFormData = async (url = '', params = new FormData()) => {
  let newUrl = `${AppConfig.baseUrl}${url}`;
  console.log('ENDPOINT...', newUrl);

  let token = await AsyncStorage.getItem('token');
  console.log('token', token);

  let result =
    token != null
      ? fetch(newUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: params,
        })
          .then(res => res.json())
          .then(resJson => {
            return resJson;
          })
          .catch(err => {
            return err;
          })
      : fetch(newUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: params,
        })
          .then(res => res.json())
          .then(resJson => {
            return resJson;
          })
          .catch(err => {
            return err;
          });
  return result;
};

const putFormData = async (url = '', params = new FormData()) => {
  let newUrl = `${AppConfig.baseUrl}${url}`;
  console.log('ENDPOINT...', newUrl);

  let token = await AsyncStorage.getItem('token');
  console.log('token', token);

  let result =
    token != null
      ? fetch(newUrl, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          body: params,
        })
          .then(res => res.json())
          .then(resJson => {
            return resJson;
          })
          .catch(err => {
            return err;
          })
      : fetch(newUrl, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: params,
        })
          .then(res => res.json())
          .then(resJson => {
            return resJson;
          })
          .catch(err => {
            return err;
          });
  return result;
};
export {get, post, postFormData, put, putFormData, postFormDataSpecialForImgBB};
