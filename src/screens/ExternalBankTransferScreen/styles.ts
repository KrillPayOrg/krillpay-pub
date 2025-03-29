import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {isSmallDevice} from '@kp/utils/helper';
import {Dimensions, Platform, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  header: {
    height: height * 0.15,
    justifyContent: 'flex-start',
  },
  card: {
    top: isSmallDevice() ? height * 0.1 : height * 0.11,
    position: 'absolute',
    borderColor: 'transparent',
  },
  text: {
    margin: 24,
    marginTop: 8,
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 16,
    color: colorWithOpacity(COLOR.darkGray, 0.8),
    alignSelf: 'center',
  },
  ACHText: {
    // marginLeft: 8,
    alignSelf: 'center',
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 12,
    color: COLOR.darkGray,
  },
  errorText: {
    color: COLOR.red,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 14,
    alignSelf: 'center',
  },
  balanceText: {
    margin: 24,
    marginTop: 8,
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 18,
    color: COLOR.darkGray,
    alignSelf: 'center',
  },
  textUSD: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 16,
    color: colorWithOpacity(COLOR.darkGray, 0.8),
    alignSelf: 'center',
  },
  disabledButton: {
    elevation: 8,
    backgroundColor: COLOR.primary,
    width: '90%',
    margin: 4,
    paddingVertical: 4,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    borderRadius: 8,
    alignSelf: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden',
    opacity: 0.5,
  },
  button: {
    elevation: 8,
    backgroundColor: COLOR.primary,
    width: '90%',
    margin: 4,
    paddingVertical: 4,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    borderRadius: 8,
    alignSelf: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
  bankText: {
    marginTop: 8,
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 16,
    color: colorWithOpacity(COLOR.darkGray, 0.8),
    alignSelf: 'flex-start',
  },
  textExternal: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 16,
    color: colorWithOpacity(COLOR.darkGray, 0.8),
  },
  verticalLine: {
    marginLeft: 8,
    width: 1, // The thickness of the line
    height: Platform.OS == 'ios' ? '100%' : '70%', // The height of the line
    backgroundColor: 'black', // The color of the line
    alignSelf: 'center',
  },
  amountContainer: {
    width: '95%',
    marginTop: 8,
    padding: 16,
    borderWidth: 1,
    alignSelf: 'flex-start',
    borderColor: colorWithOpacity(COLOR.black, 20),
    borderRadius: 15,
    flexDirection: 'row',
  },
  input: {
    padding: 0,
    marginLeft: 4,
    flexGrow: 1,
    color: COLOR.black,
  },
});
