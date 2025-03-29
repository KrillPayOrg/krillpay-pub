import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colorWithOpacity(COLOR.medium, 30),
  },
  backContainer: {
    alignSelf: 'flex-end',
    width: 20,
    height: 20,
  },
  backIcon: {
    width: 15,
    height: 15,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  error: {
    margin: 10,
    color: COLOR.red,
    fontSize: 13,
    textAlign: 'center',
  },
  numContainer: {
    width: '100%',
    alignItems: 'center',
    height: 50,
    borderColor: COLOR.border,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 25,
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: COLOR.white,
    overflow: 'hidden',
  },
  papper: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 17,
  },
  textContainer: {
    fontFamily: FONT_FAMILY.interRegular,
    height: '100%',
    backgroundColor: COLOR.white,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  textNum: {
    height: 60,
    fontFamily: FONT_FAMILY.interRegular,
    color: COLOR.black,
  },
  btn: {
    marginTop: 20,
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
