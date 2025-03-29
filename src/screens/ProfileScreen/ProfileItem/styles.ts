import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  top: {
    marginTop: 20,
    paddingBottom: 1,
  },
  left: {
    marginLeft: 20,
  },
  card: {
    alignSelf: 'center',
    height: 60,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  logo: {
    width: 16,
    height: 16,
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
