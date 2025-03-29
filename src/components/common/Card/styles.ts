import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    width: '85%',
    zIndex: 101,
  },
  cardContainer: {
    top: 40,
    left: 30,
  },
  BVNContainer: {
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    marginBottom: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#aaa',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#aaa', // Active dot color
    width: 16, // Make the active dot slightly wider
  },
  flexRow: {
    width: width * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  infoIcon: {
    marginLeft: 8,
    alignSelf: 'center',
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginTop: 1,
  },
  logo: {
    width: '100%',
    height: 200,
  },
  addIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  dollarSign: {
    width: 28,
    height: 28,
    right: 8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  ngnSign: {
    width: 26,
    height: 26,
  },
  text: {
    color: COLOR.gray,
    fontSize: 16,
    fontFamily: FONT_FAMILY.interRegular,
    marginTop: -3,
  },
  originalText: {
    color: COLOR.gray,
    fontSize: 12,
    fontFamily: FONT_FAMILY.interRegular,
  },
  numberText: {
    color: COLOR.white,
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 32,
  },
  currencyType: {
    marginTop: 0,
    alignSelf: 'flex-start',
    marginBottom: 0,
    bottom: 10,
    right: 10,
  },
  blurText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 32,
    color: COLOR.gray,
    left: 100,
    bottom: 20,
  },
});

export default styles;
