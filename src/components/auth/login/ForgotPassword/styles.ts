import {StyleSheet, Dimensions} from 'react-native';
import FONT_FAMILY from '@kp/constants/fonts';
import COLOR, {colorWithOpacity} from '@kp/constants/colors';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    alignSelf: 'center',
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    top: height * 0.17,
  },
  logo: {
    width: 85,
    height: 85,
    objectFit: 'contain',
    alignContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colorWithOpacity(COLOR.primary, 10),
  },
  title: {
    fontFamily: FONT_FAMILY.interSemiBold,
    marginTop: 21,
    color: COLOR.medium,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 30,
  },
  forgotPassContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  forgotPass: {
    color: colorWithOpacity(COLOR.darkGray, 50),
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 14,
  },
  bioContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginTop: 14,
    width: '100%',
    flexDirection: 'row',
  },
  bioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mr12: {
    marginRight: 12,
  },
  mt30: {
    marginTop: 30,
  },
});

export default styles;
