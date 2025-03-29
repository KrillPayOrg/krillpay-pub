import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  dialPadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 70,
    height: height > 700 ? 70 : 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOR.border,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: COLOR.white,
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1, // For Android
  },
  numPadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
  dialPadText: {
    fontFamily: FONT_FAMILY.interSemiBold,
    color: COLOR.medium,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default styles;
