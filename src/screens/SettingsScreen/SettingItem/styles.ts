import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  top: {
    marginTop: 20,
  },
  left: {
    marginLeft: 20,
  },
  card: {
    alignSelf: 'center',
    height: 60,
    width: '90%',
    backgroundColor: COLOR.white,
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkIcon: {
    width: 25,
    height: 25,
    borderRadius: 6,
  },
  checkBorder: {
    borderColor: COLOR.primary,
  },
  logo: {
    width: 13,
    height: 13,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  logoContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  blurText: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 10,
    color: colorWithOpacity(COLOR.medium, 55),
  },
  text: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 14,
    color: COLOR.medium,
  },
});

export default styles;
