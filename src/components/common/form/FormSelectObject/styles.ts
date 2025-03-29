import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  selectContainer: {
    width: '100%',
    alignItems: 'center',
    height: 50,
    borderColor: colorWithOpacity(COLOR.medium, 50),
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  optionContainer: {
    borderRadius: 10,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.interMedium,
    color: colorWithOpacity(COLOR.medium, 50),
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLOR.border,
  },
  placeholder: {
    color: colorWithOpacity(COLOR.medium, 50),
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  selectedText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.interMedium,
    color: colorWithOpacity(COLOR.medium, 50),
  },
  label: {
    width: '100%',
    paddingLeft: 6,
    marginBottom: 6,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: FONT_FAMILY.interMedium,
    color: colorWithOpacity(COLOR.medium, 50),
  },
});

export default styles;
