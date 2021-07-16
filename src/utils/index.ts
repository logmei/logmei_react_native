import {StyleSheet, Dimensions} from 'react-native';

const DESIGN_WIDTH = 375; // 设计稿的宽度
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
