import {StyleSheet, Dimensions} from 'react-native';
import FONT_FAMILY from '@kp/constants/fonts';
import COLOR, {colorWithOpacity} from '@kp/constants/colors';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 56,
    alignSelf: 'center',
    height: height * (height <= 852 ? 0.7 : 0.75),
  },
  bottomContainer: {
    marginBottom: 20,
  },
  error: {
    marginTop: 10,
    color: COLOR.red,
    fontSize: 13,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingBottom: 30,
  },
  mt40: {
    marginTop: 40,
  },
  pt40: {
    paddingTop: 40,
  },
  logo: {
    marginTop: 20,
    width: 85,
    height: 85,
    objectFit: 'contain',
  },
  iconContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colorWithOpacity(COLOR.primary, 10),
  },
  title: {
    fontFamily: colorWithOpacity(FONT_FAMILY.interSemiBold, 75),
    marginTop: 21,
    color: COLOR.medium,
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 30,
  },
  termsContainer: {
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  termsTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  termsText: {
    width: '85%',
    fontSize: 12,
    color: colorWithOpacity(COLOR.medium, 75),
  },
  termsHilight: {
    color: colorWithOpacity(COLOR.blue, 75),
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
  bioText: {
    color: COLOR.black,
    fontFamily: colorWithOpacity(FONT_FAMILY.interMedium, 75),
    fontSize: 14,
  },
  //Google Place Auto-Complete
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    paddingLeft: 6,
    marginBottom: 6,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: FONT_FAMILY.interMedium,
    color: colorWithOpacity(COLOR.medium, 50),
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 6,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.border,
    fontSize: 14,
    paddingLeft: 14,
    fontFamily: FONT_FAMILY.interMedium,
    color: COLOR.black,
  },
});

export default styles;
