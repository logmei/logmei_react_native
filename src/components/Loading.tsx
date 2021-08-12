import React from 'react';
import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';

interface LoadingProps {
  isShow?: boolean;
  hintText?: string;
  color?: string;
  textStyle?: any;
  loadingStyle?: any;
}
const Loading: React.FC<LoadingProps> = ({
  isShow,
  hintText,
  color,
  textStyle,
  loadingStyle,
}) => {
  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={isShow}
      onRequestClose={() => {
        ////console.log("Modal has been closed.")
      }}>
      <View style={styles.container}>
        <View style={[styles.load_box, loadingStyle]}>
          <ActivityIndicator
            animating={true}
            color={color || '#FFF'}
            size={'large'}
            style={styles.load_progress}
          />
          <Text style={[styles.load_text, textStyle]}>
            {hintText || '加载中'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  load_box: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  load_progress: {
    width: 50,
    height: 50,
  },
  //默认字体颜色
  load_text: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(178,178,178,0.8)',
  },
});

export default Loading;
