import {StyleSheet, Dimensions} from 'react-native';
import FONT_FAMILY from '@kp/constants/fonts';
import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import {isSmallDevice} from '@kp/utils/helper';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  card: {
    bottom: 60,
    alignSelf: 'center',
    height: isSmallDevice() ? null : height * 0.7,
    alignItems: 'center',
    paddingBottom: 20,
  },
  bottomContainer: {
    marginTop: 20,
  },
  logo: {
    marginTop: 20,
    width: 85,
    height: 85,
    objectFit: 'contain',
  },
  topIconContainer: {
    paddingTop: 40,
    marginBottom: 32,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  errorText: {
    color: COLOR.red,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 14,
  },
  fillContainer: {
    width: 130,
    height: 100,
    position: 'absolute',
    backgroundColor: COLOR.white,
  },
  bgContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: colorWithOpacity(COLOR.primary, 30),
    position: 'absolute',
    bottom: -30,
  },
  topIcon: {
    width: 60,
    height: 60,
  },
  badgeIcon: {
    width: 30,
    height: 30,
    bottom: -30,
    left: 46,
    position: 'absolute',
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
  },
  forgotPass: {
    color: colorWithOpacity(COLOR.darkGray, 50),
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 14,
  },
  bioContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
  },
  bioText: {
    color: colorWithOpacity(COLOR.black, 75),
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 14,
  },
  bioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    // tintColor: COLOR.primaryLight,
    // color: COLOR.primary,
  },
  mr12: {
    marginRight: 12,
  },
  checkBoxContainer: {
    marginTop: 17,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.interRegular,
    color: colorWithOpacity(COLOR.medium, 75),
  },
  mt30: {
    marginTop: height <= 800 ? height * 0.07 : height * 0.08,
  },
  mt10: {
    marginTop: 10,
  },

  heighlight: {
    color: colorWithOpacity(COLOR.blue, 75),
  },
});

export default styles;
