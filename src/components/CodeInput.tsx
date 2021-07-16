import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, KeyboardTypeOptions} from 'react-native';
import _ from 'lodash';

interface PropTypes {
  codeLength: number;
  value: string;
  inputPosition?: string;
  size?: number;
  space?: number;
  className?: string;
  cellBorderWidth?: number;
  activeColor?: string;
  inactiveColor?: string;
  ignoreCase?: boolean;
  autoFocus?: boolean;
  codeInputStyle?: any;
  containerStyle?: any;
  keyboardType?: KeyboardTypeOptions;
  onFulfill?: (params?: any) => void;
  onCodeChange?: (params?: any) => void;
}

const ConfirmationCodeInput: React.FC<PropTypes> = ({
  keyboardType = 'default',
  codeLength = 5,
  inputPosition = 'center',
  autoFocus = true,
  size = 40,
  className = 'border-box',
  cellBorderWidth = 1,
  activeColor = 'rgba(255, 255, 255, 1)',
  inactiveColor = 'rgba(255, 255, 255, 0.2)',
  space = 8,
  onCodeChange,
  onFulfill,
  codeInputStyle,
  containerStyle,
  value = '',
}) => {
  const [codeArr, setCodeArr] = useState<string[]>(value.split(''));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const codeInputRefs: any = [];
  // const clear = () => {
  //   setCodeArr(new Array(codeLength).fill(''));
  //   setCurrentIndex(0);
  //   _setFocus(0);
  // };

  const _setFocus = (index: number) => {
    codeInputRefs[index].focus();
  };

  const _blur = (index: number) => {
    codeInputRefs[index].blur();
  };

  const _onFocus = (index: number) => {
    let newCodeArr = _.clone(codeArr);
    const currentEmptyIndex = _.findIndex(newCodeArr, c => !c);
    if (currentEmptyIndex !== -1 && currentEmptyIndex < index) {
      return _setFocus(currentEmptyIndex);
    }
    // for (const i in newCodeArr) {
    //   if (+i >= index) {
    //     newCodeArr[i] = '';
    //   }
    // }
    setCodeArr(newCodeArr);
    setCurrentIndex(index);
  };

  const _getContainerStyle = (size: number, position: string) => {
    switch (position) {
      case 'left':
        return {
          justifyContent: 'flex-start',
          height: size,
        };
      case 'center':
        return {
          justifyContent: 'center',
          height: size,
        };
      case 'right':
        return {
          justifyContent: 'flex-end',
          height: size,
        };
      default:
        return {
          justifyContent: 'space-between',
          height: size,
        };
    }
  };

  const _getInputSpaceStyle = (space: number) => {
    switch (inputPosition) {
      case 'left':
        return {
          marginRight: space,
        };
      case 'center':
        return {
          marginRight: space / 2,
          marginLeft: space / 2,
        };
      case 'right':
        return {
          marginLeft: space,
        };
      default:
        return {
          marginRight: 0,
          marginLeft: 0,
        };
    }
  };

  const _getClassStyle = (className: string, active: boolean) => {
    let classStyle = {
      ..._getInputSpaceStyle(space),
      color: activeColor,
    };

    switch (className) {
      case 'clear':
        return _.merge(classStyle, {borderWidth: 0});
      case 'border-box':
        return _.merge(classStyle, {
          borderWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor,
        });
      case 'border-circle':
        return _.merge(classStyle, {
          borderWidth: cellBorderWidth,
          borderRadius: 50,
          borderColor: active ? activeColor : inactiveColor,
        });
      case 'border-b':
        return _.merge(classStyle, {
          borderBottomWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor,
        });
      case 'border-b-t':
        return _.merge(classStyle, {
          borderTopWidth: cellBorderWidth,
          borderBottomWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor,
        });
      case 'border-l-r':
        return _.merge(classStyle, {
          borderLeftWidth: cellBorderWidth,
          borderRightWidth: cellBorderWidth,
          borderColor: active ? activeColor : inactiveColor,
        });
      default:
        return className;
    }
  };

  const _onKeyPress = (e: {nativeEvent: {key: string}}) => {
    if (e.nativeEvent.key === 'Backspace') {
      let newCodeArr = _.clone(codeArr);
      const nextIndex = currentIndex > 0 ? currentIndex - 1 : 0;
      // for (const i in newCodeArr) {
      //   if (+i >= nextIndex) {
      //     newCodeArr[i] = '';
      //   }
      // }
      if (onCodeChange) {
        onCodeChange(newCodeArr.join(''));
      }
      _setFocus(nextIndex);
    }
  };

  const _onInputCode = (character: string, index: number) => {
    let newCodeArr = _.clone(codeArr);
    newCodeArr[index] = character;

    if (index == codeLength - 1) {
      const code = newCodeArr.join('');

      if (onFulfill) {
        onFulfill(code);
      }
      _blur(currentIndex);
    } else {
      _setFocus(currentIndex + 1);
    }

    setCodeArr(newCodeArr);
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (onCodeChange) {
        onCodeChange(newCodeArr.join(''));
      }
    });
  };

  const initialCodeInputStyle = {
    width: size,
    height: size,
  };

  let codeInputs = [];
  for (let i = 0; i < codeLength; i++) {
    const id = i;
    codeInputs.push(
      <TextInput
        key={id}
        ref={ref => (codeInputRefs[id] = ref)}
        style={[
          styles.codeInput,
          initialCodeInputStyle,
          _getClassStyle(className, currentIndex == id),
          codeInputStyle,
        ]}
        underlineColorAndroid="transparent"
        selectionColor={activeColor}
        keyboardType={keyboardType}
        returnKeyType={'done'}
        autoFocus={autoFocus && id == 0}
        onFocus={() => _onFocus(id)}
        value={codeArr[id] ? codeArr[id].toString() : ''}
        onChangeText={text => _onInputCode(text, id)}
        onKeyPress={e => _onKeyPress(e)}
        maxLength={1}
      />,
    );
  }

  return (
    <View
      style={[
        styles.container,
        _getContainerStyle(size, inputPosition),
        containerStyle,
      ]}>
      {codeInputs}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  codeInput: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    padding: 0,
  },
});

export default ConfirmationCodeInput;
