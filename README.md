### android 安装配置
yarn android
> 注意：build.gradle配置
 ```   // google()
        maven { url 'https://maven.aliyun.com/repository/google' }
        // jcenter()
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
```
### 安装:npm i
### 运行 npm run android

### 异步请求
request：/src/utils/request.ts
上传文件：/src/utils/requestUpload.ts
请求示例：/src/services/test.ts 
websocket:/src/utils/websockets.ts

### 组件库：react-native-elements
地址：https://reactnativeelements.com/docs/
#### 图标：react-native-vector-icons
地址：https://github.com/oblador/react-native-vector-icons
https://oblador.github.io/react-native-vector-icons/
### 路由：@react-navigation/native
地址：https://reactnavigation.org/docs/hello-react-navigation

### 存储：@react-native-async-storage/async-storage
地址：https://react-native-async-storage.github.io/async-storage/docs/api

### 地图：react-native-amap3d
### 调试：react-native-debugger 
地址：https://github.com/jhen0409/react-native-debugger

### 消息推送：react-native-push-notification

### 阴影：react-native-neomorph-shadows
```
npm i react-native-neomorph-shadows
npm install @react-native-community/art --save

cd ios && pod install && cd ..
```
### 录制语音：react-native-audio
react-native-audio版本较低需要进行修改：AudioRecorderManager文件
```
-import android.support.v4.app.ActivityCompat;
-import android.support.v4.content.ContextCompat;

+import androidx.core.app.ActivityCompat;
+import androidx.core.content.ContextCompat;
```

### 播放语音：react-native-sound



