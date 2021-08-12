import React from 'react';
import Login from '../pages/login';
import Home from '../pages/home';
import Record from '../pages/record';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BarCodePage from './BarCodePage';
import OcrPage from '../pages/ocr';
import Location from '../pages/location';

const Stack = createStackNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Login">
        {/* 登录页面 */}
        <Stack.Screen name="Login" component={Login} />
        {/* home页面 */}
        <Stack.Screen name="Home" component={Home} />
        {/* 扫描组件 */}
        <Stack.Screen name="BarCodePage" component={BarCodePage} />
        {/* 扫描后的展示图片页面 */}
        <Stack.Screen name="OcrPage" component={OcrPage} />
        {/* 列表页面 */}
        <Stack.Screen name="Record" component={Record} />
        {/* 设备定位 */}
        <Stack.Screen name="Location" component={Location} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Nav;
