import {StyleSheet} from 'react-native';
import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    height: 50,
    borderColor: COLOR.border,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: COLOR.white,
    overflow: 'hidden',
  },
  icon: {
    color: COLOR.medium,
    fontSize: 20,
    marginRight: 10,
  },
  textContainer: {
    fontFamily: FONT_FAMILY.interRegular,
    height: '100%',
    backgroundColor: COLOR.white,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
    height: 60,
    fontFamily: FONT_FAMILY.interRegular,
    color: COLOR.black,
  },
});

export default styles;
