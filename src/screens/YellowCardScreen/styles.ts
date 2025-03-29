import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    flex: 1,
  },
  header: {
    justifyContent: 'flex-start',
    height: height * 0.07,
  },
  mt20: {
    marginTop: 20,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  top: {
    marginTop: 10,
  },
  headingText: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 12,
    color: colorWithOpacity(COLOR.medium, 90),
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
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 12,
    color: COLOR.medium,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 24,
    alignSelf: 'center',
    width: '80%',
  },
  networkTitle: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.interMedium,
    marginBottom: 10,
  },
  mt40: {
    marginTop: 40,
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
    color: colorWithOpacity(COLOR.medium, 50),
  },
  amountContainer: {
    borderColor: COLOR.border,
    borderWidth: 1,
    height: 50,
    width: 100,
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoText: {
    textAlign: 'center',
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 12,
    color: COLOR.medium,
    alignSelf: 'center',
    right: 5,
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
  },
  logoVerify: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    right: 15,
  },
  midContainer: {
    height: 100,
    width: '50%',
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    height: 55,
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
