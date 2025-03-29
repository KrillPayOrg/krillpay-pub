import {StyleSheet} from 'react-native';
import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    height: 55,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  mr5: {
    marginRight: 5,
  },
  text: {
    fontFamily: FONT_FAMILY.interSemiBold,
    color: COLOR.white,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  customText: {
    top: 4,
    fontFamily: FONT_FAMILY.interSemiBold,
    color: COLOR.medium,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default styles;
