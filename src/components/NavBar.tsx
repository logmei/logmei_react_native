import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {pxToDp} from '../utils';

interface NavBarProps {
  title?: string;
  backgroundColor?: string;
  onPress?: (params?: any) => void;
  barStyle?: 'dark-content' | 'light-content' | 'default';
  iconStyle?: any;
  textStyle?: any;
  showReturnIcon?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({
  title,
  backgroundColor,
  barStyle,
  onPress,
  iconStyle,
  textStyle,
  showReturnIcon = true,
}) => {
  const navigation = useNavigation();
  const handlerPress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <View
      style={{
        ...Style.navBar,
        backgroundColor: backgroundColor || '#fff',
      }}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={barStyle || 'light-content'}
      />
      {showReturnIcon ? (
        <TouchableOpacity
          style={{
            width: pxToDp(50),
            alignItems: 'center',
            height: pxToDp(22),
            justifyContent: 'center',
          }}
          onPress={handlerPress}>
          <Icon
            style={[
              Style.left,
              {color: barStyle === 'dark-content' ? '#323233' : '#fff'},
              iconStyle,
            ]}
            name="left"
            size={20}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            width: pxToDp(50),
            height: pxToDp(22),
          }}
        />
      )}

      <Text
        style={[
          Style.text,
          {color: barStyle === 'dark-content' ? '#323233' : '#fff'},
          textStyle,
        ]}>
        {title}
      </Text>
      <View style={Style.right} />
    </View>
  );
};

const Style = StyleSheet.create({
  navBar: {
    height: pxToDp(56),
    width: '100%',
    paddingBottom: pxToDp(9),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 100,
  },
  left: {
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: pxToDp(18),
  },
  right: {
    width: pxToDp(50),
    justifyContent: 'center',
  },
});

export default NavBar;
