import {StyleSheet} from 'react-native';
import FONT_FAMILY from '@kp/constants/fonts';

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  text: {
    top: 6,
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 11,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default styles;
