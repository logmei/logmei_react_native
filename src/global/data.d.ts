export interface RequestOptParams extends Object {
  data?: Object;
  method: string;
  urlType?: string;
  filePath?: string;
  contentType?: string;
}
export interface RequestUploadOptParams extends Object {
  filePath: string;
  [key: string]: any;
}

export interface DataProps {
  name: string;
  label: string;
  value: string;
}
