import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {isSmallDevice} from '@kp/utils/helper';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    justifyContent: 'flex-start',
    height: height * 0.1,
  },
  left: {
    textAlign: 'center',
  },
  top: {
    marginTop: 10,
  },
  mb20: {
    marginBottom: 10,
  },
  chargeText: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 14,
    color: COLOR.medium,
  },
  amountTextTotal: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 14,
    color: COLOR.medium,
  },
  cashContainer: {
    width: '85%',
    borderColor: COLOR.border,
    borderWidth: 1,
    // height: height * 0.1,
    padding: 16,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: COLOR.white,
    elevation: 5, // For Android
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '85%',
    marginTop: 0,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bankTransaction: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  headingText: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 12,
    color: colorWithOpacity(COLOR.medium, 90),
  },
  text: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 12,
    color: COLOR.medium,
  },
  card: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 10,
    marginTop: 10,
    position: 'relative',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userContainer: {},
  logo: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  flag: {
    top: isSmallDevice() ? height * 0.13 : height * 0.115,
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
  lightText: {
    marginLeft: 10,
    marginTop: 10,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 14,
    color: COLOR.medium,
  },
  boldText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 24,
    color: COLOR.medium,
  },
  button: {
    position: 'absolute',
    top: 30,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    height: 55,
  },
  disabledButton: {
    position: 'absolute',
    top: 30,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    height: 55,
    alignSelf: 'center',
    overflow: 'hidden',
    opacity: 0.5,
  },
  whiteText: {
    color: COLOR.white,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 16,
  },
  userText: {
    marginTop: 0,
    marginLeft: 0,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 16,
    color: colorWithOpacity(COLOR.medium, 50),
  },
  flagContainer: {
    flexDirection: 'row',
    marginLeft: 4,
  },
  textContainer: {
    marginTop: 30,
    alignSelf: 'center',
  },
  bottomContainer: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
  },
  bankContainer: {
    height: 200,
    width: '100%',
    alignSelf: 'center',
  },
});

export default styles;
