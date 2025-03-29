import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'flex-start',
    height: height * 0.15,
  },
  alignCenter: {
    // alignItems: 'center',
    alignSelf: 'center',
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
  textContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  transactionText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 14,
    color: COLOR.medium,
  },
  transactionList: {
    marginTop: 5,
    borderColor: COLOR.gray,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    width: '100%',
    height: height * 0.6,
    overflow: 'hidden',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
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
  dollarSign: {
    fontSize: 12,
    // borderWidth: 1,
    // width: 24,
    // height: 24,
    // borderRadius: 12,
    fontFamily: FONT_FAMILY.interMedium,
    color: colorWithOpacity(COLOR.darkGray, 0.7),
  },
  amountText: {
    flexGrow: 1,
    textAlign: 'right',
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 15,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5, // For Android
  },
  text: {
    left: 2,
    fontSize: 14,
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
  },
  date: {
    marginTop: 60,
    marginLeft: 25,
    marginBottom: 10,
    flexDirection: 'row',
  },
  download: {
    marginTop: 60,
    marginBottom: 10,
    marginRight: 16,
    flexDirection: 'row',
  },
  calendarLogo: {width: 18, height: 20, resizeMode: 'contain'},
});

export default styles;
