import BottomTabBar from '@/components/BottomTabBar';
import NavBar from '@/components/NavBar';
import Spinner from '@/components/Spinner';
import React, {useState} from 'react';
import {Text, View} from 'react-native';

const Record = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <View style={{flex: 1}}>
      <NavBar title="列表" showReturnIcon={false} barStyle="dark-content" />
      <Spinner visible={loading} setVisible={() => setLoading(false)} />
      <Text>Record Screen</Text>
      <BottomTabBar />
    </View>
  );
};
export default Record;
