import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    position: 'absolute',
    top: 115,
    right: '10%',
  },
  stepText: {
    fontSize: 14,
    color: colorWithOpacity(COLOR.black, 0.5),
    fontFamily: FONT_FAMILY.interMedium,
  },
  bottomContainer: {
    // marginTop: height * 0.65,
    bottom: 12,
    position: 'absolute',
  },
});

export default styles;
