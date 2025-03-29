import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: 'absolute',
    alignSelf: 'center',
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    top: height * 0.4,
  },
  timer: {
    top: height * 0.4,
    alignSelf: 'center',
    position: 'relative',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mt40: {
    marginTop: 40,
  },
  error: {
    color: COLOR.red,
    fontSize: 13,
  },
  resendText: {
    color: COLOR.black,
    fontFamily: colorWithOpacity(FONT_FAMILY.interMedium, 75),
    fontSize: 15,
  },
  resendTextBold: {
    color: COLOR.black,
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 15,
  },
  timerText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.interMedium,
    color: COLOR.medium,
  },
});

export default styles;
