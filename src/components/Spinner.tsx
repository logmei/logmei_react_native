import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

interface SpinnerProps {
  visible: boolean;
  setVisible?: (param?: boolean) => void;
}

const Spinner: React.FC<SpinnerProps> = ({visible, setVisible}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => setVisible && setVisible(false)}>
      <View style={styles.container}>
        <View style={[styles.background]}>
          <ActivityIndicator color="#fff" size="large" style={{flex: 1}} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
  background: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    bottom: 0,
    // flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContainer: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContent: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
    top: 80,
  },
});
export default Spinner;
