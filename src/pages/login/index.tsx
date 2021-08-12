import React from 'react';
import {Button, ImageBackground, StatusBar, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {WebSocketObj} from '../../../App';
// import request from '../../utils/request';

// request('/').then(() => {
//   // console.log('axios', res);
// });

const Login = () => {
  const navigation = useNavigation();
  const handlerHome = () => {
    // AsyncStorage.setItem('token', res.token);
    WebSocketObj.init(() => {
      WebSocketObj.sendMsg(JSON.stringify({type: 'REGISTER', userId: 1}));
    });
    navigation.navigate('Home');
  };
  const image = {
    uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201104%2F16%2F2136492e16kpc6oqcz1rie.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631167726&t=bd17b066d85de2cfd008c5ea2907386b',
  };
  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground
        source={image}
        style={{
          width: '100%',
          height: '100%',
          alignContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 26,
            marginTop: '30%',
            fontWeight: 'bold',
            color: '#fff',
          }}>
          login Screen
        </Text>
        <Input
          style={{marginTop: 20}}
          placeholder="请输入名称"
          leftIcon={<Icon name="user" size={24} color="#ccc" />}
        />
        <Button title="go to home" onPress={handlerHome} />
      </ImageBackground>
    </View>
  );
};

export default Login;
