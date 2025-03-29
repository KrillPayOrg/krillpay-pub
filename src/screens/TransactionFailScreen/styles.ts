import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    justifyContent: 'center',
    height: height * 0.1,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 15,
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '80%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
  },
  failureHeading: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 28,
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
  },
  failureText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: FONT_FAMILY.interMedium,
    color: COLOR.medium,
  },
});

export default styles;
