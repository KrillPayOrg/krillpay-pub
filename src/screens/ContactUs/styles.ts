import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {isSmallDevice} from '@kp/utils/helper';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  card: {
    top: 20,
    bottom: 60,
    alignSelf: 'center',
    // height:  height * 0.76,
    alignItems: 'center',
    paddingVertical: 20,
    // paddingBottom: 20,
  },
  errorText: {
    color: COLOR.red,
  },
  mt10: {
    marginTop: 10,
  },

  header: {
    height: isSmallDevice() ? height * 0.07 : height * 0.06,
  },
  inTouchContainer: {
    // top:20,
    width: '100%',
    marginBottom: 12,
    gap: 20,
    // paddingBottom: 20,
  },
  text: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 20,
    alignSelf: 'center',
    color: COLOR.black,
  },
  connectView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
    // height:80,
  },
  connectList: {
    gap: 5,
    width: '80%',
  },
  connectTitleText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 14,
    color: COLOR.black,
  },
  connectText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 14,
    color: colorWithOpacity(COLOR.black, 50),
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: colorWithOpacity(COLOR.blue, 20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 25,
    width: 25,
  },
});

export default styles;
