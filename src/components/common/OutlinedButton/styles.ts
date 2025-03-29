import {StyleSheet} from 'react-native';
import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR.primary,
    borderWidth: 1,
    height: 55,
  },
  text: {
    fontFamily: FONT_FAMILY.interSemiBold,
    color: COLOR.primary,
    fontSize: 12,
    textTransform: 'uppercase',
  },
});

export default styles;
