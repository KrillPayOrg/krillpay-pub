import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    height: 56,
    width: '100%',
  },
  pressable: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  cardText: {
    color: COLOR.medium,
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 14,
    marginLeft: 26,
  },
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.border,
    position: 'absolute',
    right: 0,
    zIndex: 10,
  },
  activRadio: {
    backgroundColor: colorWithOpacity(COLOR.primary, 25),
  },
  active: {
    backgroundColor: COLOR.primary,
  },
  radioFill: {
    borderRadius: 7.5,
    width: 13,
    height: 13,
  },
});

export default styles;
