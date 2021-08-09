import request from '../utils/request';
import {requestUpload} from '@/utils/requestUpload';
import qs from 'qs';

/**
 * form方式上传参数
 * @param params
 */
 export function formParamsService(params: {
  carNo: string;
  planId: string;
  fileId: string;
  add: boolean;
}) {
  return request('/formParam', {
    method: 'post',
    data: qs.stringify(params),
    contentType: 'application/x-www-form-urlencoded',
  });
}

/**
 * get方式
 * @param params
 */
 export function getListService(params: {id: string}) {
  return request(`/list`, {
    method: 'get',
    data: {
      ...params,
    },
  });
}

/**
 * post方式
 * @param params
 */
 export function postService(params: {id: string}) {
  return request(`/post`, {
    method: 'post',
    data: {
      ...params,
    },
  });
}

/**
 * 
 * @param params 
 * 注意：filePath:格式为file://文件路径
 * @returns 
 */
 export function uploadService(params: {filePath: string; planId: string}) {
  return requestUpload('/upload', {
    ...params,
  });
}

