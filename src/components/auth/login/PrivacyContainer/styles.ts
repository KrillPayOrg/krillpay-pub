import {StyleSheet} from 'react-native';
import FONT_FAMILY from '@kp/constants/fonts';
import COLOR, {colorWithOpacity} from '@kp/constants/colors';

const styles = StyleSheet.create({
  privacyContainer: {
    marginTop: 20,
  },
  privacyText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.interRegular,
    textAlign: 'center',
    color: colorWithOpacity(COLOR.medium, 75),
    lineHeight: 25,
  },
  highlightPrivacy: {
    color: colorWithOpacity(COLOR.blue, 75),
    textDecorationLine: 'underline',
  },
});

export default styles;
