import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {isSmallDevice} from '@kp/utils/helper';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    marginTop: isSmallDevice() ? 15 : 0,
    alignSelf: 'center',
    borderColor: COLOR.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  activeTab: {
    position: 'absolute',
    width: '45%',
    height: isSmallDevice() ? height * 0.03 : height * 0.033,
    borderRadius: 7,
    backgroundColor: COLOR.primary,
  },
  tab: {
    width: '45%',
    height: isSmallDevice() ? height * 0.028 : height * 0.033,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  tabText: {
    color: COLOR.medium,
    fontSize: 14,
    // textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.interSemiBold,
  },
  activeText: {
    color: COLOR.white,
  },
});

export default styles;
