import {pxToDp} from '../utils';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {questionSvg} from '../images/svg_source';
import {Shadow} from 'react-native-neomorph-shadows';
import {Image, Text} from 'react-native-elements';

interface ImagesListProps {
  datas: string[]; // 图片路径
  isQuestion?: boolean; // 是否有问题
  onQuestion?: (params?: any) => void;
}

const ImagesList: React.FC<ImagesListProps> = ({
  datas,
  isQuestion = false,
  onQuestion,
}) => {
  const handlerPress = () => {
    if (onQuestion) {
      onQuestion();
    }
  };
  return (
    <View
      style={{
        ...styles.row,
        // height: datas.length <= 3 ? pxToDp(66) : pxToDp(130),
      }}>
      {datas.length !== 0 ? (
        datas.map((data: string, index: number) => {
          // console.log('images', data);
          return (
            <Image
              key={index + data}
              source={{uri: data}}
              style={{
                ...styles.item,
                marginRight: datas.length !== index + 1 ? pxToDp(8) : 0,
              }}
            />
          );
        })
      ) : (
        <></>
      )}
      {isQuestion ? (
        <TouchableOpacity
          style={styles.question}
          onPress={handlerPress}
          activeOpacity={0.8}>
          <Shadow
            // <- enable inner shadow
            useArt // <- set this prop to use non-native shadow on ios
            style={styles.photo}>
            <SvgXml xml={questionSvg} width="100%" height="100%" />
          </Shadow>
        </TouchableOpacity>
      ) : (
        <Text />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: pxToDp(8),
    marginTop: pxToDp(10),
    position: 'relative',
  },
  item: {
    width: pxToDp(100),
    height: pxToDp(64),
    borderRadius: pxToDp(4),
    marginBottom: pxToDp(10),
  },
  question: {
    backgroundColor: '#fff',
    width: pxToDp(49),
    height: pxToDp(49),
    position: 'absolute',
    borderRadius: pxToDp(49),
    bottom: -10,
    right: 10,
    shadowOffset: {width: 50, height: 50},
    shadowColor: 'green',
  },
  photo: {
    width: pxToDp(49),
    height: pxToDp(49),
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowColor: '#FF7121',
    shadowRadius: 5,
    borderRadius: pxToDp(49),
    backgroundColor: '#FF7121',
  },
});

export default ImagesList;
