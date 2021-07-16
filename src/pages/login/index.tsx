import React from 'react';
import {Button, StatusBar, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import request from '../../utils/request';

// request('/').then(() => {
//   // console.log('axios', res);
// });

const Login = () => {
  const navigation = useNavigation();
  const handlerHome = () => {
    navigation.navigate('Home');
  };
  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <View>
        <Text>login Screen</Text>

        <Input
          placeholder="请输入名称"
          leftIcon={<Icon name="film" size={24} color="#ccc" />}
        />
        <Button title="go to home" onPress={handlerHome} />
      </View>
    </View>
  );
};

export default Login;
