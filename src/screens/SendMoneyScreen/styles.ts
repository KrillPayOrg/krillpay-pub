import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, Platform, StyleSheet} from 'react-native';
const {height, width} = Dimensions.get('screen');

const getWidth = (width: number) => {
  if (width >= 430) {
    return '80%';
  }
  return Platform.OS === 'ios' ? '80%' : '85%';
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    height: height,
  },
  header: {
    justifyContent: 'flex-start',
    height: height * 0.15,
  },
  headerCountry: {
    justifyContent: 'flex-start',
    height: 60,
  },
  mt20: {
    // position: 'absolute',
    bottom: 0,
    marginTop: 20,
  },
  selectWallet: {
    height: '100%',
  },
  amountParent: {
    width: '50%',
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Align them to the left
    justifyContent: 'center', // Center them vertically
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
    width: width >= 430 ? '80%' : '85%',
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
    marginTop: 50,
  },
  input: {
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
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
  cash: {
    fontFamily: FONT_FAMILY.interSemiBold,
    color: COLOR.medium,
    fontSize: 24,
    textAlign: 'center',
  },
  numPadContainer: {
    paddingTop: 20,
    marginTop: 20,
    alignSelf: 'center',
    borderColor: COLOR.border,
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    width: getWidth(width),
    height: height * 0.47,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1, // For Android
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '80%',
    marginTop: 15,
  },
  text: {
    color: COLOR.white,
    fontSize: 20,
    fontFamily: FONT_FAMILY.interSemiBold,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    height: 55,
  },
  verifyContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLOR.border,
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: COLOR.white,
    height: 100,
    width: '100%',
  },
  sendAmount: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 22,
    color: COLOR.medium,
  },
  sendText: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 12,
    marginBottom: 4,
    color: colorWithOpacity(COLOR.greenButton, 80),
  },
  amountContainer: {
    borderColor: COLOR.border,
    borderWidth: 1,
    height: 50,
    // width: 100,
    paddingHorizontal: 16,
    borderRadius: 10,
    // alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
  },
  backIcon: {
    width: 16,
    height: 16,
    marginLeft: 4,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logoText: {
    textAlign: 'center',
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 12,
    color: COLOR.medium,
    alignSelf: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  amountText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 18,
    color: COLOR.medium,
    alignSelf: 'center',
    marginLeft: 5,
  },
  balanceText: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 12,
    color: colorWithOpacity(COLOR.medium, 50),
    alignSelf: 'center',
    marginTop: 6,
    // position: 'absolute',
    // bottom: -18,
    flexGrow: 1,
  },
  logoVerify: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    right: 15,
  },
  lightingVerify: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
    right: 13,
  },
  midContainer: {
    height: 140,
    width: '50%',
    alignSelf: 'center',
  },
  buttonComingSoon: {
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLOR.primary,
    borderWidth: 1,
    backgroundColor: COLOR.white,
    height: 55,
  },
  whiteText: {
    color: COLOR.white,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 16,
    textAlign: 'center',
  },
  blackText: {
    color: COLOR.primary,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
