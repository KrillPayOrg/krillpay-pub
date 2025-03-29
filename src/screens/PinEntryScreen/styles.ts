import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import { isSmallDevice } from '@kp/utils/helper';
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
  mainContainer: {
    marginTop: 50,
    width: '100%',
    paddingHorizontal: '7%',
  },
  top: {
    width: '100%',
    marginTop: 20,
  },
  mt90: {
    marginTop: 90,
  },
  disableStyles:{
    marginTop: 90,
    backgroundColor: colorWithOpacity(COLOR.primaryLight, 25),
  },
  imageContainer: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: colorWithOpacity(COLOR.primaryLight, 25),
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  otpContainer: {
    width: '100%',
    marginTop: 50,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    left: 7,
    top: 23,
  },
  boldText: {
    fontSize: 24,
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
    textAlign: 'center',
  },
  lightText: {
    fontSize: isSmallDevice() ?  14 : 16,
    fontFamily: FONT_FAMILY.interRegular,
    color: COLOR.medium,
    textAlign: 'center',
  },
});

export default styles;
