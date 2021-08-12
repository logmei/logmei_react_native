import {StyleSheet, Dimensions} from 'react-native';

const DESIGN_WIDTH = 375; // 设计稿的宽度
export const DefaultPageParams = {
  pageSize: 8,
};

// 默认样式
export const DefaultStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});
// 屏幕的宽度  若动态的需要调用Dimensions动态获取
export const screenWidth = Dimensions.get('screen').width;
// 屏幕的高度
export const screenHeight = Dimensions.get('screen').height;
// px转dp
export const pxToDp = (px: number) => {
  return (screenWidth * px) / DESIGN_WIDTH;
};
export const StandardPxToDp = (px: number) => {
  return (screenWidth * px) / DESIGN_WIDTH;
};

// data转columns数据
export const DataToColumnsValue = (DetailColumns: any) => {
  return (data: any) => {
    return DetailColumns.map((v: any) => {
      return {...v, value: data[v.name]};
    });
  };
};

export const getLocalTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const mouth = date.getMonth() + 1;
  const day = date.getDate() + 1;
  return `${year}-${mouth}-${day} ${date.toLocaleTimeString()}`;
};
// 获取分页数据
export const getPageList = (
  sourceList: any,
  pageSize: number = DefaultPageParams.pageSize,
) => {
  const count: number = sourceList.length;
  const pages: number = Math.ceil(count / pageSize);
  return (current: number) => {
    if (sourceList.length === 0) {
      return null;
    }
    if ((current - 1) * pageSize > count) {
      return null;
    }
    const fromNum: number = (current - 1) * pageSize;
    const endNum: number =
      fromNum + pageSize > count ? count : fromNum + pageSize;
    return {
      count,
      pages,
      current,
      list: sourceList.slice(fromNum, endNum),
    };
  };
};

export const FormatDetailTime = (time: string) => {
  const date = new Date(time);
  const month = date.getMonth() + 1;
  const day = date.getDate() + 1;
  const hour = date.getHours();
  const minus = date.getMinutes();
  return `${handerLessTen(month)}/${handerLessTen(day)} ${hour}:${
    minus === 0 ? '00' : minus
  }`;
};

const handerLessTen = (v: number) => {
  return v < 10 ? '0' + v : '' + v;
};
