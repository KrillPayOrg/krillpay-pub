import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    height: height,
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
    height: height * 0.75,
  },
  buttonContainer: {
    marginTop: 30,
    alignSelf: 'center',
    width: '80%',
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
