import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {isSmallDevice} from '@kp/utils/helper';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  header: {
    height: height * 0.15,
    justifyContent: 'flex-start',
  },
  card: {
    top: isSmallDevice() ? height * 0.1 : height * 0.11,
    position: 'absolute',
    borderColor: 'transparent',
  },
  infoIcon: {
    marginRight: 8,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  text: {
    margin: 24,
    marginTop: 8,
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 16,
    color: colorWithOpacity(COLOR.darkGray, 0.8),
    alignSelf: 'center',
  },
  textExternal: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 16,
    color: colorWithOpacity(COLOR.darkGray, 0.4),
  },
  textExternalTitle: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 16,
    color: colorWithOpacity(COLOR.darkGray, 0.8),
  },
  button: {
    elevation: 8,
    backgroundColor: COLOR.primary,
    width: '90%',
    margin: 4,
    paddingVertical: 4,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    borderRadius: 8,
    alignSelf: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
  disabledButton: {
    elevation: 8,
    backgroundColor: COLOR.primary,
    width: '90%',
    margin: 4,
    paddingVertical: 4,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    borderRadius: 8,
    alignSelf: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden',
    opacity: 0.5,
  },
  input: {
    height: 40,
    margin: 12,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    padding: 10,
    borderColor: COLOR.black,
  },
  embedded: {
    width: '95%',
    alignSelf: 'center',
    height: 360,
  },
});
