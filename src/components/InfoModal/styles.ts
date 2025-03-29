import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colorWithOpacity(COLOR.medium, 30),
  },
  papper: {
    height: 200,
    width: '70%',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 17,
  },
  text: {
    fontSize: 14,
    color: colorWithOpacity(COLOR.medium, 50),
    textAlign: 'center',
    fontFamily: FONT_FAMILY.interRegular,
    marginBottom: 13,
  },
});

export default styles;
