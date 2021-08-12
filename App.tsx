import {DefaultStyles} from './src/utils';
import React, {useState} from 'react';
import {View} from 'react-native';
import Nav from './src/components/nav';
import {DefaultWsUrl, TabDatas} from '@/utils/config';
import {TabItemProps} from '@/components/BottomTabBar';
import {Socket} from './src/utils/websocket';

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

export const WebSocketObj = new Socket(DefaultWsUrl);
export interface RootContextProps {
  tabIndex: number;
  toggleTab: Function;
  tabDatas: TabItemProps[];
}

export const RootContext = React.createContext<RootContextProps>({
  tabIndex: 0,
  toggleTab: (_: number) => {},
  tabDatas: [],
});
// export const WebSocketObj = new Socket(DefaultWsUrl);

function App() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [tabDatas, setTabDatas] = useState<TabItemProps[]>([...TabDatas]);

  const toggleTab = (index: number) => {
    setTabIndex(index);
    setTabDatas(datas => {
      return datas.map((data, i) => {
        if (i === index) {
          return {...data, focused: true};
        } else {
          return {...data, focused: false};
        }
      });
    });
  };
  return (
    <RootContext.Provider value={{tabIndex, toggleTab, tabDatas}}>
      <View style={{...DefaultStyles.fullScreen}}>
        <Nav />
      </View>
    </RootContext.Provider>
  );
}

export default App;
