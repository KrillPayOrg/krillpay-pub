import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  qrLoader: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  animatedLine: {
    position: 'absolute',
    width: '83%',
    backgroundColor: 'white',
    height: 2,
    alignSelf: 'center',
    zIndex: 101,
  },
  angle: {
    width: 100,
    height: 100,
    borderStartWidth: 2,
    zIndex: 101,
    borderTopWidth: 2,
    borderColor: COLOR.white,
    position: 'absolute',
  },
  angleLeft: {
    left: 20,
    top: 20,
  },
  angleRight: {
    right: 20,
    top: 20,
    transform: [{rotate: '90deg'}],
  },
  angleBottomRight: {
    right: 20,
    bottom: 20,
    transform: [{rotate: '180deg'}],
  },
  angleBottomLeft: {
    left: 20,
    bottom: 20,
    transform: [{rotate: '270deg'}],
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
