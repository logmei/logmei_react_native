import {TabItemProps} from '@/components/BottomTabBar';

export default {
  develop: 'http://localhost/protect-api',
  production: 'http://localhost/protect-api',
};

export const DefaultRequestUrl = 'http://localhost/protect-api';
export const DefaultWsUrl = 'ws://82.157.123.54:9010/ajaxchattest';

export const TabDatas: TabItemProps[] = [
  {
    label: '首页',
    icon: 'home',
    pageName: 'Home',
    focused: true,
    iconType: 'xml',
  },
  {
    label: '扫描拍照',
    icon: 'photo-camera',
    pageName: 'BarCodePage',
    focused: false,
    iconType: 'fontIcon',
  },
  {
    label: '定位',
    icon: 'record',
    pageName: 'Location',
    focused: false,
  },
];
