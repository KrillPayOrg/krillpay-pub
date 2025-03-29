import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderColor: COLOR.gray,
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  infoContainer: {
    marginLeft: 10,
    height: 'auto',
    justifyContent: 'center',
  },
  title: {
    color: COLOR.medium,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 14,
    marginBottom: 5,
  },
  tag: {
    color: colorWithOpacity(COLOR.medium, 50),
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 12,
  },
  phone: {
    color: colorWithOpacity(COLOR.medium, 50),
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 10,
  },
});

export default styles;
