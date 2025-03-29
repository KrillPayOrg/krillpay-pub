import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    height: height,
  },
  mt40: {
    marginTop: 40,
  },
  header: {
    justifyContent: 'flex-start',
    height: height * 0.15,
  },
  subContainer: {
    width: '100%',
    marginTop: height * 0.05,
    position: 'absolute',
    height: height,
  },
  text: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 14,
    color: colorWithOpacity(COLOR.white, 70),
    marginLeft: 30,
  },
  amountText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 18,
    color: COLOR.medium,
    alignSelf: 'center',
    marginLeft: 5,
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
  balanceText: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 12,
    color: colorWithOpacity(COLOR.medium, 50),
    alignSelf: 'center',
  },
  midContainer: {
    height: 100,
    width: '50%',
    alignSelf: 'center',
  },
  card: {
    padding: 20,
    marginTop: 20,
    position: 'relative',
    height: height * 0.75,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  logoText: {
    textAlign: 'center',
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 12,
    color: COLOR.medium,
    alignSelf: 'center',
    right: 5,
  },
  btn: {
    position: 'absolute',
    bottom: 17,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 17,
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
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  logoVerify: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    right: 15,
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
});

export default styles;
