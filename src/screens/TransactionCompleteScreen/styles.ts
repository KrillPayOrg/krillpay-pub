import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    justifyContent: 'center',
    height: height * 0.1,
  },
  top: {
    marginTop: 50,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 15,
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  flagIcon: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  feeText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.interSemiBold,
    color: colorWithOpacity(COLOR.black, 50),
  },
  arrowIcon: {
    alignSelf: 'center',
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  conversionContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '80%',
  },
  text: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONT_FAMILY.interRegular,
    color: COLOR.medium,
  },
  textBank: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONT_FAMILY.interRegular,
    color: COLOR.medium,
  },
  textBankLight: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: FONT_FAMILY.interMedium,
    color: colorWithOpacity(COLOR.medium, 40),
  },
  bankText: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: FONT_FAMILY.interSemiBold,
    color: COLOR.medium,
  },
  amountText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONT_FAMILY.interSemiBold,
    color: COLOR.medium,
  },
  conversionText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
  },
  tradeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
  },
  whiteText: {
    color: COLOR.white,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 16,
  },
  cash: {
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
    fontSize: 24,
  },
  userContainer: {
    marginTop: 10,
  },
  flag: {
    top: height * 0.08,
    alignSelf: 'center',
    width: 40,
    height: 40,
    resizeMode: 'contain',
    position: 'absolute',
  },
  image: {
    alignSelf: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  bankLogo: {
    width: 46,
    height: 46,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 23,
  },
  lightText: {
    marginLeft: 10,
    marginTop: 10,
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 16,
    color: colorWithOpacity(COLOR.medium, 50),
  },
  boldText: {
    marginLeft: 10,
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 24,
    color: COLOR.medium,
    textAlign: 'center',
  },
  transferContainer: {
    marginTop: 50,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  NGNText: {
    marginTop: 50,
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textNGN: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 28,
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
  },
  userText: {
    marginTop: 0,
    marginLeft: 0,
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 30,
    alignSelf: 'center',
  },
  left: {
    left: 10,
  },
  tradeText: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 16,
    color: COLOR.medium,
  },
});

export default styles;
