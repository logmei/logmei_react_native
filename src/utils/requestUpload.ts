import {RequestUploadOptParams} from '@/global/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {DefaultRequestUrl} from './config';
import {Alert} from 'react-native';

const instance = axios.create({
  baseURL: DefaultRequestUrl,
  timeout: 1000000,
});

instance.interceptors.response.use(
  (response: any) => {
    console.log('response', response.status, response.data);
    if (response.status === 200) {
      return response.data;
    } else {
      Alert.alert('请求失败' + response.status, response.data.msg);
      Promise.reject(response.data);
    }
  },
  error => {
    Promise.reject(error);
    console.error(JSON.stringify(error));
    Alert.alert('error', JSON.stringify(error));
  },
);
/**
 *
 * @param url
 * @param formData
 *  const formData = new FormData();
    formData.append(file, {
      uri: file.uri,
      type: 'application/octet-stream',
      name:'image.jpg'
    });
    formData.append('planId', 1);
 * @returns
 */
export const requestUpload = async (
  url: string,
  params: RequestUploadOptParams,
) => {
  const authrization = await AsyncStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', {
    uri: params.filePath,
    type: 'multipart/form-data',
    name: params.filePath.replace(/^.*\/(\w+\.\w+)$/, '$1'),
  });
  Object.getOwnPropertyNames(params).forEach(key => {
    formData.append(key, params[key]);
  });
  console.log(url, 'formData', formData, authrization);
  return instance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: 'Bearer ' + authrization,
    },
  });
};
