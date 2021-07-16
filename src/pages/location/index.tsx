import React from 'react';
import {Text, View} from 'react-native';
import {MapView} from 'react-native-amap3d';

const Location = () => {
  return (
    <View style={{flex: 1}}>
      <Text>sdfjslkdfljs</Text>
      <MapView
        locationEnabled
        onLocation={(params: any) => console.log(`${JSON.stringify(params)}`)}
      />
    </View>
  );
};
export default Location;
