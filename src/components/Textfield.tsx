import {DataProps} from '@/global/data';
import {pxToDp} from '@/utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

interface TextFieldProps {
  data: DataProps[];
  type: 'horizontal' | 'vertical';
}

const TextField: React.FC<TextFieldProps> = ({data, type}) => {
  return (
    <View style={styles.list}>
      {data.map((v, index) => {
        return (
          <View
            key={v.label + index}
            style={{
              ...styles.item,
              width: type === 'horizontal' ? '45%' : '90%',
            }}>
            <Text style={styles.itemTitle}>{v.label}</Text>
            <Text style={styles.itemText}>{v.value}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {},
  item: {
    flexDirection: 'row',
  },
  itemTitle: {
    fontSize: pxToDp(15),
    color: '#999999',
    marginRight: pxToDp(11),
  },
  itemText: {
    fontSize: pxToDp(15),
    color: '#323232',
    fontWeight: '500',
    maxWidth: pxToDp(110),
    overflow: 'hidden',
  },
});

export default TextField;
