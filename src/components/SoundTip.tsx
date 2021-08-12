import {audio_icon_svg, audio_tip_svg} from '@/images/svg_source';
import {pxToDp} from '@/utils';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';

interface AudioTipComProps {
  visible: boolean; // true开始录音，false结束录音
  style?: object;
}
let timer1: any;
const AudioAnimalIcon: React.FC<{style?: any}> = ({style}) => {
  const [, setFadeNum] = useState<boolean>(false);
  const [color, setColor] = useState<string>('rgba(255,255,255,0.5)');

  const animation = useCallback(() => {
    timer1 = setInterval(() => {
      setFadeNum(v => {
        setColor(`rgba(255,255,255,${v ? '0.5' : '1'})`);
        return !v;
      });
    }, 500);
  }, []);

  useEffect(() => {
    animation();
    return () => {
      clearInterval(timer1);
    };
  }, [animation]);
  return (
    <View
      style={[
        {alignItems: 'center', width: pxToDp(29), height: pxToDp(25)},
        style,
      ]}>
      <SvgXml
        xml={audio_icon_svg.audio_icon_1(color)}
        width={pxToDp(29)}
        height={pxToDp(10)}
      />
      <SvgXml
        xml={audio_icon_svg.audio_icon_2('#fff')}
        width={pxToDp(18)}
        height={pxToDp(8)}
      />
      <SvgXml
        xml={audio_icon_svg.audio_icon_3}
        width={pxToDp(6)}
        height={pxToDp(7)}
      />
    </View>
  );
};

const AudioTipCom: React.FC<AudioTipComProps> = ({visible = false, style}) => {
  return (
    <View style={[styles.audioTip, style, {opacity: visible ? 1 : 0}]}>
      <SvgXml xml={audio_tip_svg} width="100%" height="100%" />
      <AudioAnimalIcon style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  audioTip: {
    width: pxToDp(195),
    height: pxToDp(73),
    justifyContent: 'center',
    marginBottom: pxToDp(15),
  },
  icon: {
    position: 'absolute',
    top: pxToDp(19),
    left: pxToDp(85),
  },
});

export default AudioTipCom;
