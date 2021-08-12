import {pxToDp} from '@/utils';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ButtonGroupProps {
  texts: string[];
  onChecked: (index: number) => void;
  style?: any;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({texts, onChecked, style}) => {
  const colors = ['#fff', '#266FFF'];
  // const fontColors = ['#266FFF', '#fff'];
  const radius = [
    {borderTopLeftRadius: pxToDp(4), borderBottomLeftRadius: pxToDp(4)},
    {borderTopRightRadius: pxToDp(4), borderBottomRightRadius: pxToDp(4)},
    ,
  ];

  return (
    <TouchableOpacity style={[styles.groups, style]} activeOpacity={0.8}>
      {texts.map((v, index) => (
        <View
          style={[
            {
              backgroundColor: colors[index],
              width: '50%',
              height: pxToDp(47),
              justifyContent: 'center',
              alignItems: 'center',
            },
            radius[index],
          ]}
          key={v}>
          <Text
            onPress={() => onChecked(index)}
            style={{
              fontSize: pxToDp(18),
              color: index === 0 ? '#266FFF' : '#fff',
              width: '100%',
              textAlign: 'center',
            }}>
            {v}
          </Text>
        </View>
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  groups: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ButtonGroup;
