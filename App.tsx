import {DefaultStyles} from './src/utils';
import React from 'react';
import {View} from 'react-native';
import Nav from './src/components/nav';

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

function App() {
  return (
    <View style={{...DefaultStyles.fullScreen}}>
      <Nav />
    </View>
  );
}

export default App;
