import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {isSmallDevice} from '@kp/utils/helper';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textContainer: {
    padding: 5,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    marginBottom: 8,
  },
  statusContainer: {
    marginHorizontal: 5,
    paddingTop: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  statusText: {
    marginHorizontal: 5,
    paddingTop: 3,
    fontSize: 10,
    fontFamily: FONT_FAMILY.interBold,
    color: colorWithOpacity(COLOR.white, 0.8),
  },
  text: {
    marginTop: 15,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 15,
    color: colorWithOpacity(COLOR.darkGray, 0.5),
    textAlign: 'center',
  },
  transactionText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 14,
    color: COLOR.medium,
    alignSelf: 'center',
  },
  viewMoreText: {
    paddingTop: isSmallDevice() ? 14 : 0,
    height: isSmallDevice() ? 30 : null,
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 14,
    right: 8,
    alignSelf: 'center',
    color: colorWithOpacity(COLOR.darkGray, 0.6),
  },
  dollarSign: {
    fontSize: 12,
    // borderWidth: 1,
    // width: 24,
    // height: 24,
    // borderRadius: 12,
    fontFamily: FONT_FAMILY.interMedium,
    color: colorWithOpacity(COLOR.darkGray, 0.7),
  },
  transactionList: {
    top: 2,
    borderColor: COLOR.gray,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: '100%',
    height: isSmallDevice() ? height * 0.35 : height * 0.42,
    overflow: 'hidden',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  transactionItems: {
    padding: 10,
    flexDirection: 'row',
    borderBottomColor: colorWithOpacity(COLOR.darkGray, 0.4),
    borderBottomWidth: 1,
  },
  infoContainer: {
    marginLeft: 12,
    width: '80%',
    justifyContent: 'space-between',
  },
  textHeading: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.interBold,
    color: colorWithOpacity(COLOR.darkGray, 0.8),
  },
  textContent: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.interMedium,
    color: colorWithOpacity(COLOR.darkGray, 0.5),
  },
  amountText: {
    flexGrow: 1,
    textAlign: 'right',
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 15,
  },
  flatlistContainer:{paddingBottom: 80}
});

export default styles;
