import {BottomTabIcon} from '@/images/svg_source';
import {pxToDp} from '@/utils';
import {useBottomTabBar} from '@/utils/customHooks';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
// import {RootContext} from '../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
/**
 * fontIcon:采用https://oblador.github.io/react-native-vector-icons/AntDesign
 */
export interface TabItemProps {
  icon: string | 'record' | 'home' | 'photo-camera';
  label: string;
  pageName?: string;
  focused?: boolean;
  iconType?: 'fontIcon' | 'xml';
}

interface BottomTabBarProps {
  isNavigate?: boolean;
  onChecked?: (index: number) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  isNavigate = true,
  onChecked,
}) => {
  const navigation = useNavigation();
  // const {toggleTab, tabDatas} = useContext(RootContext);
  const {toggleTab, tabDatas} = useBottomTabBar();
  const handlerChecked = (v: TabItemProps, index: number) => {
    if (isNavigate) {
      navigation.navigate(v.pageName || 'home');
    } else {
      onChecked && onChecked(index);
    }
    toggleTab(index);
  };
  return (
    <View style={styles.tab}>
      {tabDatas.map((v, index: number) => {
        return (
          <TouchableOpacity
            style={styles.tabItem}
            key={v.label}
            activeOpacity={1}
            onPress={() => {
              handlerChecked(v, index);
            }}>
            {v.iconType === 'xml' || !v.iconType ? (
              <SvgXml
                xml={BottomTabIcon[v.icon](v.focused || false)}
                style={{width: pxToDp(25), height: pxToDp(25)}}
              />
            ) : (
              <Icon
                name={v.icon}
                size={26}
                style={{color: v.focused ? '#266FFF' : '#999'}}
              />
            )}

            <Text style={[styles.text, v.focused && styles.checked]}>
              {v.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: pxToDp(50),
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  tabItem: {
    alignItems: 'center',
  },
  text: {
    fontSize: pxToDp(10),
    color: '#949494',
    fontWeight: '400',
  },
  checked: {
    color: '#266FFF',
  },
});

export default BottomTabBar;
