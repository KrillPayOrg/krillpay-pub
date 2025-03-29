import {StatusBar, StyleSheet} from 'react-native';
import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    position: 'relative',
    // bottom: StatusBar.currentHeight
    //   ? StatusBar.currentHeight - (StatusBar.currentHeight - 40)
    //   : 40,
  },
  bottomContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 25,
  },
  mr5: {
    marginRight: 5,
  },
  bottomText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.interMedium,
    color: colorWithOpacity(COLOR.medium, 75),
    marginRight: 5,
  },
  btnText: {
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
  },
});

export default styles;
