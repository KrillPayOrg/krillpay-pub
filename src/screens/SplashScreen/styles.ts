import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
    marginTop: 10,
  },
});

export default styles;
