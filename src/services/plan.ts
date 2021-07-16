import request from '../utils/request';

/**
 * ocr识别
 * @param params
 */
export function ocrNumService(params: any) {
  return request('/orc', {
    method: 'get',
    data: {
      ...params,
    },
  });
}
