import COLOR from '@kp/constants/colors';
import {Dimensions, Platform, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primaryLight,
    alignContent: 'center',
    flexDirection: 'row',
    height:  Platform.OS == 'ios' ? height * 0.08 : 56,
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // marginBottom: Platform.OS == 'ios' ? 18 : 0,
  },
  tintWhite: {
    tintColor: COLOR.white,
  },
  separator: {
    borderTopColor: COLOR.white,
    borderTopWidth: 0.5,
  },
  sliderContainer: {
    height: 4,
    position: 'absolute',
    top: 0,
    left: 10,
    alignItems: 'center',
  },
  shadowBorder: {
    borderRadius: 6,
  },
  tabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  tabIconFocused: {
    width: 70,
    height: 70,
    borderWidth: 5,
    borderRadius: 35,
    borderColor: COLOR.primary,
    backgroundColor: COLOR.primary,
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconFocus: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    left: 2,
  },
});

export default styles;
