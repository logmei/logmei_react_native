import React, {useEffect, useState} from 'react';
// import RNAudiotransition from 'react-native-audiotransition';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {pxToDp} from '@/utils';
import {Shadow} from 'react-native-neomorph-shadows';
import {SvgXml} from 'react-native-svg';
import {mic_svg} from '@/images/svg_source';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';
import {Button} from 'react-native-elements';
import SoundTip from './SoundTip';

const RecordSound = () => {
  const [filePath] = useState<string>(
    AudioUtils.DocumentDirectoryPath + '/gtjx.aac',
  );
  const [stoppedRecording, setStoppedRecording] = useState<boolean>(false);
  const [recordVisible, setRecordVisible] = useState<boolean>(false);
  // 开始录音
  const handlerPress = () => {
    setRecordVisible(true);
    _record();
  };

  const handlerPressOut = async () => {
    setRecordVisible(false);
    _stop();
  };
  const _prepareRecordingPath = (audioPath: string) => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      OutputFormat: 'aac_adts',
      AudioEncodingBitRate: 32000,
    });
  };
  const _stop = async () => {
    setStoppedRecording(true);
    try {
      const filePath = await AudioRecorder.stopRecording();
      if (Platform.OS === 'android') {
        _finishRecording(true, filePath);
      }

      return filePath;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };
  const _finishRecording = (
    didSucceed: boolean,
    filePath: string,
    fileSize?: any,
  ) => {
    console.log(
      `Finished recording of duration  seconds at path: ${filePath} and size of ${
        fileSize || 0
      } bytes`,
    );
  };
  const _record = async () => {
    if (stoppedRecording) {
      _prepareRecordingPath(filePath);
    }

    try {
      await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  };
  const _play = async () => {
    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(filePath, '', (error: any) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play((success: any) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  };

  useEffect(() => {
    // RNAudiotransition.initAudioTransition();
    AudioRecorder.requestAuthorization().then((isAuthorised: any) => {
      console.log('AudioRecorder isAuthorised', isAuthorised);
      if (!isAuthorised) {
        return;
      }

      _prepareRecordingPath(filePath);
    });
  }, [filePath]);

  return (
    <View style={styles.home}>
      <Button
        onPress={_play}
        title="播放"
        containerStyle={{backgroundColor: '#333', marginLeft: 100, width: 200}}
        style={{width: 200, height: 100}}
      />
      <View style={styles.bottom}>
        <SoundTip visible={recordVisible} />
        <TouchableOpacity
          style={[styles.mic]}
          onPressIn={handlerPress}
          onPressOut={handlerPressOut}
          activeOpacity={0.29}>
          <Shadow
            // <- enable inner shadow
            useArt // <- set this prop to use non-native shadow on ios
            style={styles.micShadow}>
            <SvgXml xml={mic_svg} width="100%" height="100%" />
          </Shadow>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: '#EEF2F9',
    flex: 1,
  },
  content: {
    padding: pxToDp(10),
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: pxToDp(24),
    height: pxToDp(24),
    backgroundColor: '#E1EBFF',
    borderRadius: pxToDp(24),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: pxToDp(6),
  },
  webView: {
    marginTop: pxToDp(16),
    borderRadius: pxToDp(8),
    height: pxToDp(154),
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#333',
  },
  barSelectText: {
    fontSize: pxToDp(20),
    fontWeight: 'bold',
    color: '#333',
    marginRight: pxToDp(10),
  },
  timebar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: pxToDp(11),
  },
  timeText: {
    fontSize: pxToDp(15),
    fontWeight: '500',
    color: '#333',
  },
  detailText: {
    fontSize: pxToDp(15),
    fontWeight: '500',
    color: '#949494',
    marginLeft: 'auto',
    marginRight: pxToDp(7),
  },
  bottom: {
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 1,
    top: -10,
  },
  mic: {
    margin: 'auto',
  },
  micShadow: {
    width: pxToDp(102),
    height: pxToDp(102),
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowColor: '#266FFF',
    shadowRadius: 8,
    borderRadius: pxToDp(50),
    backgroundColor: '#fff',
  },
});
export default RecordSound;
