import {getLocalTime, pxToDp, StandardPxToDp} from '@/utils';
import {useBottomTabBar} from '@/utils/customHooks';
import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {MapView} from 'react-native-amap3d';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const Location = () => {
  const [mapViewRef, setMapViewRef] = useState<any>();
  const [showButton, setShowButton] = useState<boolean>(false);
  const [initCoordinate, setInitCoordinate] = useState<any>({
    latitude: 39.91095,
    longitude: 116.37296,
  });
  const navigation = useNavigation();
  const {toggleTab} = useBottomTabBar();
  const _animatedToTAM = (coordinate: object) => {
    //console.log('_animatedToTAM');
    setShowButton(true);
    mapViewRef.setStatus(
      {
        tilt: 0,
        rotation: 0,
        zoomLevel: 18,
        center: coordinate,
      },
      1000,
    );
  };
  const _return = () => {
    if (!showButton) {
      toggleTab(0);
      navigation.goBack();
      return;
    }
    setShowButton(false);
    setInitCoordinate(initCoordinate);
    mapViewRef.setStatus(
      {
        tilt: 0,
        rotation: 0,
        zoomLevel: 15,
        center: initCoordinate,
      },
      1000,
    );
  };
  // useEffect(() => {
  //   if (mapViewRef) {
  //     mapViewRef.setStatus({zoomLevel: 18});
  //   }
  // });
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.bar}>
        <Text
          style={{
            fontSize: StandardPxToDp(16),
            fontWeight: 'bold',
            color: '#333',
          }}>
          {getLocalTime()}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#266FFF',
            borderWidth: 1,
            borderRadius: pxToDp(4),
            justifyContent: 'center',
            alignItems: 'center',
            width: pxToDp(40),
            height: pxToDp(22),
          }}
          activeOpacity={0.8}
          onPress={_return}>
          <Text style={{color: '#266FFF'}}>返回</Text>
        </TouchableOpacity>
      </View>
      <MapView
        ref={ref => setMapViewRef(ref)}
        mapType={4}
        zoomLevel={15}
        showsLabels={false}
        style={StyleSheet.absoluteFill}
        center={initCoordinate}>
        <MapView.Marker
          onPress={() =>
            _animatedToTAM({
              latitude: 39.91495,
              longitude: 116.37046,
            })
          }
          icon={() => (
            <Icon name="md-location-sharp" size={26} color="#266FFF" />
          )}
          coordinate={{
            latitude: 39.91495,
            longitude: 116.37046,
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: pxToDp(15),
    width: '100%',
    height: pxToDp(50),
    zIndex: 100,
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
    alignItems: 'center',
  },
});

export default Location;
