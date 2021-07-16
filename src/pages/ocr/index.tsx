// import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {StatusBar, View, StyleSheet, ImageBackground} from 'react-native';
import CodeInput from '../../components/CodeInput';
const OcrImage: React.FC = () => {
  const route: any = useRoute();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [codeValue, setCodeValue] = useState<string>('22222');
  // const {getItem, setItem} = useAsyncStorage('test');

  // const readItemFromStorage = async () => {
  //   const item = await getItem();
  //   console.log('item...', item);
  // };

  // const writeItemToStorage = async (newValue: string) => {
  //   await setItem(newValue);
  // };

  // useEffect(() => {
  //   writeItemToStorage('logmei');
  //   setTimeout(() => {
  //     readItemFromStorage();
  //   }, 1000);
  // });

  useEffect(() => {
    console.log('route', route.params, imageUrl);
    if (route?.params) {
      setImageUrl(route.params.imagePath);
    }
  }, [route.params, imageUrl]);
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground source={{uri: imageUrl}} style={styles.image}>
        <View style={{marginTop: 300}}>
          <CodeInput
            keyboardType="numeric"
            codeLength={5}
            value={codeValue}
            autoFocus={false}
            codeInputStyle={{fontWeight: '800'}}
            onFulfill={(v: any) => setCodeValue(v)}
            onCodeChange={(v: any) => setCodeValue(v)}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default OcrImage;
