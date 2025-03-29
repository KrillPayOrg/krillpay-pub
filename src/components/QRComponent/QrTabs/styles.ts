import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 35,
    width: '95%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLOR.primary,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    alignSelf: 'center',
    borderRadius: 15,
  },
  activeTab: {
    position: 'absolute',
    width: '45%',
    height: 41,
    borderRadius: 7,
    backgroundColor: COLOR.primary,
  },
  tab: {
    width: '45%',
    height: 41,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  tabText: {
    color: COLOR.medium,
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: FONT_FAMILY.interSemiBold,
  },
  activeText: {
    color: COLOR.white,
  },
});

export default styles;
