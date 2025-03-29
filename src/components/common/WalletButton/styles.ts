import {Dimensions, StyleSheet} from 'react-native';
import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {isSmallDevice} from '@kp/utils/helper';
const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    left: 20,
  },
  pic: {
    width: isSmallDevice() ? 40 : 70,
    height: isSmallDevice() ? 40 : 70,
    resizeMode: 'contain',
  },
  boldText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 16,
    color: COLOR.medium,
  },
  text: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 16,
    color: COLOR.medium,
  },
  amountContainer: {
    alignItems: 'flex-end',
    bottom: 5,
    paddingRight: 16,
  },
  amount: {
    fontSize: 16,
  },
  dollarSign: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: COLOR.black,
    marginRight: 1,
  },
  ngnSign: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: COLOR.black,
    marginRight: 4,
  },
});

export default styles;
