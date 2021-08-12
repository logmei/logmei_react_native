import {DashLineSvg} from '@/images/svg_source';
import {pxToDp} from '@/utils';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
interface DividerProps {
  width?: number;
  style?: object;
  height?: number | string;
  type?: string;
  color?: string;
}

const Divider: React.FC<DividerProps> = props => {
  return (
    <SvgXml
      xml={DashLineSvg(
        pxToDp(props.width || 348),
        props.type || 'solid',
        props.color,
      )}
      style={{...styles.divider, ...props}}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: pxToDp(10),
  },
});

export default Divider;
