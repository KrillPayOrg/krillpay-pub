import {Dimensions, Platform, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

const isLargeScreen = height > 700;
const isIOS = Platform.OS === 'ios';
const statusBarHeight =
  isLargeScreen && isIOS
    ? height * 0.08
    : Platform.OS === 'android'
    ? 40
    : height * 0.03;

const styles = StyleSheet.create({
  statusBar: {
    height: statusBarHeight,
  },
});

export default styles;
