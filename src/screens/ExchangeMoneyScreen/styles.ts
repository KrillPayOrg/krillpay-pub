import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {isSmallDevice} from '@kp/utils/helper';
import {Dimensions, StyleSheet} from 'react-native';
const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    height: height,
  },
  cashContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  header: {
    justifyContent: 'flex-start',
    height: height * 0.15,
  },
  selectWallet: {
    height: '100%',
  },
  feeText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.interRegular,
    color: COLOR.gray,
  },
  papper: {
    width: '100%',
    marginTop: 20,
    height: isSmallDevice() ? height * 0.085 : height * 0.07,
  },
  logo: {
    marginTop: 12,
    alignSelf: 'center',
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 5,
  },
  walletButton: {
    position: 'absolute',
    top: height * 0.09,
    backgroundColor: COLOR.white,
    alignSelf: 'center',
    height: height * 0.11,
    borderColor: COLOR.border,
    borderWidth: 1,
    borderRadius: 20,
    zIndex: 101,
    overflow: 'hidden',
    width: width * 0.9,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5, // For Android
  },
  top: {
    paddingHorizontal: 30,
    marginTop: 60,
    width: '100%',
  },
  buyContainer: {
    marginTop: 40,
  },
  input: {
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '75%',
    height: height * 0.07,
    backgroundColor: COLOR.white,
    borderColor: COLOR.border,
    borderWidth: 1,
    borderRadius: 15,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1, // For Android
  },
  text: {
    fontFamily: FONT_FAMILY.interSemiBold,
    color: COLOR.black,
    fontSize: 24,
  },
  conversionText: {
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.black,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 13,
  },
  conversionContainer: {
    width: isSmallDevice() ? '65%' : '50%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  lightText: {
    marginTop: 12,
    fontFamily: FONT_FAMILY.interSemiBold,
    color: colorWithOpacity(COLOR.black, 90),
    fontSize: 20,
    alignSelf: 'center',
  },
  left: {
    marginLeft: 30,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '75%',
    borderBottomColor: COLOR.border,
    borderBottomWidth: 1,
    // textAlign: 'right',
    paddingBottom: 0,
  },
  titles: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 25,
    color: COLOR.medium,
  },
  disabledColor: {
    color: COLOR.gray,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 50,
  },
  button: {
    alignSelf: 'center',
    position: 'relative',
    bottom: -40,
    backgroundColor: COLOR.primary,
  },
  whiteText: {
    color: COLOR.white,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 16,
  },
});

export default styles;
