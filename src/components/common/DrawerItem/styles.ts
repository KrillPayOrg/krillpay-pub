import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  background: {
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  labelStyle: {
    right: 20,
    width: 200,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 12,
  },
  whiteColor: {
    color: COLOR.white,
  },
  whiteBg: {
    backgroundColor: COLOR.white,
  },
  primaryColor: {
    backgroundColor: COLOR.primaryLight,
  },
  mediumColor: {
    color: COLOR.medium,
  },
});

export default styles;
