import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: '10%',
    backgroundColor: COLOR.white,
  },
  titleContainer: {
    marginBottom: 32,
    width: '100%',
  },
  title: {
    fontSize: 16,
    color: colorWithOpacity(COLOR.medium, 75),
    fontFamily: FONT_FAMILY.interMedium,
  },
  btn: {
    marginTop: 52,
  },
});

export default styles;
