import {RequestOptParams} from '@/global/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://www.baidu.com',
  timeout: 10000,
});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    Promise.reject(error);
  },
);

export const requestUpload = async (
  url: string,
  option: RequestOptParams = {method: 'get'},
  rest?: any,
) => {
  const authrization = await AsyncStorage.getItem('token');
  console.log('authrization', authrization);
  const header = {
    'content-type': 'multipart/form-data',
    authorization: authrization,
  };

  let config: any = {
    url,
    method: option.method,
    headers: header,
    responseType: 'blob',
  };
  if (option.method.toLowerCase() === 'get') {
    config = {...config, params: option.data};
  } else if (
    ['post', 'put', 'patch'].indexOf(option.method.toLowerCase()) !== -1
  ) {
    config = {...config, data: option.data};
  }
  return await instance({
    ...config,
    ...rest,
  });
};

const request = async (
  url: string,
  option: RequestOptParams = {method: 'get'},
  rest?: any,
) => {
  const authrization = await AsyncStorage.getItem('token');
  console.log('authrization', authrization);
  const header = {
    'content-type': option.contentType || 'application/json',
    authorization: authrization,
  };

  let config: any = {
    url,
    method: option.method,
    headers: header,
  };
  if (option.method.toLowerCase() === 'get') {
    config = {...config, params: option.data};
  } else if (
    ['post', 'put', 'patch'].indexOf(option.method.toLowerCase()) !== -1
  ) {
    config = {...config, data: option.data};
  }
  return await instance({
    ...config,
    ...rest,
  });
};

export default request;
