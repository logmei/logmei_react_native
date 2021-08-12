import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  InteractionManager,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/AntDesign';
import {RootContext} from '../../App';

const Height = () => {
  return Dimensions.get('window').height;
};

const Width = () => {
  return Dimensions.get('window').width;
};

interface StateType {
  transCode: string; // 条码
  typeCode: string; // 条码类型
  showCode: boolean;
  imagePath: string; // 拍照图片
  animateCode: any;
}

interface PropsType {
  navigation: any;
}

class BarCodePage extends Component<PropsType, StateType> {
  state = {
    transCode: '', // 条码
    typeCode: '', // 条码类型
    showCode: true,
    imagePath: '', // 拍照图片
    animateCode: new Animated.Value(10),
  };
  camera: any;
  static contextType = RootContext;
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.startAnimation();
    });
    console.log('进入-------', this.state.showCode);
  }

  // 动画开始
  startAnimation() {
    this.state.animateCode.setValue(0);
    Animated.timing(this.state.animateCode, {
      toValue: 1, // 运动终止位置，比值
      duration: 2500, // 动画时长
      easing: Easing.linear, // 线性的渐变函数
      delay: 0.3, // 在一段时间之后开始动画（单位是毫秒），默认为0
      useNativeDriver: true,
    }).start(() => this.startAnimation());
  }

  barcodeReceived(e: any) {
    let that = this;
    if (this.state.showCode) {
      console.log(e);
      that.setState({
        transCode: e.data,
        typeCode: e.type,
        showCode: false,
      });
      if (e.data) {
        let barCodeData = {
          typeName: 'testScan', // TestPage获取此值
          typeValue: e.data,
        };
        console.log('barCodeData', barCodeData);
        this.takePicture();
        // that.props.navigation.navigate('TestPage', {barCodeData});;
      }
    }
  }

  // 关闭扫一扫
  closeScanPage() {
    const {toggleTab} = this.context;
    toggleTab(0);
    this.props.navigation.navigate('Home');
  }

  /*
   * 点击拍照
   * */
  takePicture = async () => {
    //jpegQuality 1-100, 压缩图片
    const options = {jpegQuality: 50};
    if (this.camera) {
      const data = await this.camera.takePictureAsync(options);
      console.log('uri', data.uri);
      /*图片本地路径*/
      this.setState({
        imagePath: data.uri,
      });

      /*获取图片大小*/
      Image.getSize(data.uri, (width, height) => {
        console.log(width, height);
      });
      this.props.navigation.navigate('OcrPage', {imagePath: data.uri});
      //   this.camera
      //     .capture({options})
      //     .then((data: any) => {
      //       console.log(data);

      //       /*图片本地路径*/
      //       this.setState({
      //         imagePath: data.path,
      //       });

      //       /*获取图片大小*/
      //       Image.getSize(data.path, (width, height) => {
      //         console.log(width, height);
      //       });
      //     })
      //     .catch((err: any) => console.error(err));
      //
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <SafeAreaView style={styles.container}>
          <RNCamera
            ref={cam => (this.camera = cam)}
            // onBarCodeRead={this.barcodeReceived.bind(this)}
            onCameraReady={() => {
              console.log('ready');
            }}
            permissionDialogTitle={'提示信息'}
            permissionDialogMessage={
              'APP需要使用相机，请打开相机权限允许APP使用'
            }
            style={styles.scan_camera}>
            <View style={styles.scan_cont_box}>
              <View style={styles.scan_cont_circle}>
                <Animated.View
                  style={{
                    alignItems: 'center',
                    transform: [
                      {
                        // translateX: x轴移动
                        // translateY: y轴移动
                        translateY: this.state.animateCode.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 140],
                        }),
                      },
                    ],
                  }}>
                  <Text style={styles.scan_circle_init} />
                </Animated.View>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.scan_top_box}
              onPress={() => this.closeScanPage()}>
              <Icon name="closecircleo" size={24} color="#ccc" />
              {/* <Image source={require('../images/close.png')} /> */}
            </TouchableOpacity>
            <View style={styles.scan_info_box}>
              <Text style={styles.scan_info}>
                将条形码放入框内，即可自动扫描
              </Text>
            </View>
            <View
              style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style={styles.capture}>
                <Text
                  style={{
                    fontSize: 14,
                  }}>
                  识别并拍照
                </Text>
              </TouchableOpacity>
            </View>
            {/*拍照完毕，显示图片到界面上*/}

            <Image
              style={{
                width: 100,
                height: 100,
              }}
              source={{uri: this.state.imagePath}}
            />
          </RNCamera>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scan_top_box: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 24,
    height: 24,
    marginTop: 40,
  },
  scan_camera: {
    flex: 1,
    height: Height(),
  },
  scan_cont_box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scan_cont_circle: {
    width: 330,
    height: 160,
    borderWidth: 1,
    borderColor: '#919191',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scan_circle_init: {
    width: 250,
    height: 1,
    backgroundColor: '#00ff00',
  },
  scan_info_box: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    width: Width(),
  },
  scan_info: {
    color: '#fff',
  },
  info: {
    width: Width(),
    height: 80,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingBottom: 5,
    justifyContent: 'space-around',
  },
  capture: {
    flex: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
    color: '#333',
    fontWeight: '600',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 40,
  },
});

export default BarCodePage;
