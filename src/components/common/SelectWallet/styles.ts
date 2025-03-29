import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '82%',
  },
  card: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    top: -(height * 0.05),
    height: height * 0.1,
    borderWidth: 0,
  },
  showAmount: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  walletButton: {
    marginTop: 40,
    backgroundColor: COLOR.white,
    alignSelf: 'center',
    height: height * 0.11,
    borderColor: COLOR.gray,
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    width: '89.5%',
  },
  walletHeight: {
    height: height * 0.16,
  },
  container: {
    top: 20,
  },
  text: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 18,
    color: COLOR.medium
  },
  dollarSign: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: COLOR.black
  },
  ngnSign: {
    width: 26,
    height: 26,
  },
});

export default styles;
