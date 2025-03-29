import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: COLOR.white,
  },
  mainBody: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginTop: 37,
    marginBottom: 20,
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 22,
    color: COLOR.medium,
  },
  descContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  shortDesc: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },
  lnh25: {
    lineHeight: 25,
  },
  flag: {
    position: 'absolute',
    width: 20,
    height: 20,
    bottom: 3,
    right: '38%',
  },
  bodyDesc: {
    color: colorWithOpacity(COLOR.medium, 75),
    fontSize: 16,
    textAlign: 'center',
  },
  stepsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  step: {
    borderRadius: 3,
    height: 5,
    width: 13,
    backgroundColor: COLOR.gray,
  },
  active: {
    backgroundColor: COLOR.primary,
  },
  ml4: {
    marginLeft: 4,
  },
  btn: {
    marginTop: 32,
  },
});

export default styles;
