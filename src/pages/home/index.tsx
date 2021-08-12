import BottomTabBar from '@/components/BottomTabBar';
import NavBar from '@/components/NavBar';
import Spinner from '@/components/Spinner';
import React, {useState} from 'react';
import {View} from 'react-native';
import Images from '@/components/Images';
import Divider from '@/components/Divider';
import TextField from '@/components/Textfield';
import RecordSound from '@/components/RecordSound';

const imageList = [
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi04.c.aliimg.com%2Fimg%2Fibank%2F2013%2F211%2F016%2F791610112_758613609.jpg&refer=http%3A%2F%2Fi04.c.aliimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631324176&t=3edc54e7dab2858ac0227caf716ba6f7',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F48124ed00ae163228d4e65acf0d54c5cc5a2f31a2e142-PaXGuD_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631324176&t=73018163667e7ed928c525b4a8d25edd',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.cnkang.com%2Fcnkfile1%2FM00%2F13%2F88%2Fo4YBAFkxDNaAQyMIAABEym48NOw51.jpeg&refer=http%3A%2F%2Ffile.cnkang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631324176&t=5d122714bb1b7749c366a08f5ac27ed2',
];

const TextFieldData = [
  {name: 'name', label: '姓名', value: 'logmei'},
  {name: 'sex', label: '性别', value: '女'},
  {name: 'name1', label: '姓名1', value: 'logmei1'},
  {name: 'sex1', label: '性别2', value: '女2'},
];

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <View style={{flex: 1}}>
      <NavBar title="首页" showReturnIcon={false} barStyle="dark-content" />
      <Spinner visible={loading} setVisible={() => setLoading(false)} />
      <Images datas={imageList} isQuestion={true} />
      <Divider />
      <TextField data={TextFieldData} type="horizontal" />
      <Divider />
      <RecordSound />
      <BottomTabBar />
    </View>
  );
};
export default Home;
