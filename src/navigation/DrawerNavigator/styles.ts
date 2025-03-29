import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  closeIconContainer: {justifyContent: 'flex-end', alignItems: 'flex-end'},
  closeIcon: {
    width: 30,
    height: 30,
    right: 10,
  },
  imageStyle: {
    borderRadius: 10,
  },
  focusedIcon: {
    tintColor: COLOR.white,
  },
  inactiveIcon: {
    tintColor: COLOR.black,
  },
  logo: {
    width: 240,
    height: 80,
    left: 20,
    marginTop: 20,
  },
  drawerIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerContainer: {flexDirection: 'row', left: 20, top: 10},
  image: {width: 50, height: 50, borderRadius: 25},
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    left: 10,
    top: 2,
  },
  header: {
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.white,
    fontSize: 16,
  },
  text: {
    fontFamily: FONT_FAMILY.interRegular,
    color: COLOR.white,
    fontSize: 12,
  },
  itemList: {
    flex: 1,
    marginTop: 40,
    height: height * 0.6,
    marginBottom: 8,
  },
  logout: {
    flexDirection: 'row',
    padding: 8,
    marginBottom: 28,
    alignItems: 'center',
  },
  logOutText: {
    marginLeft: 5,
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
    fontSize: 16,
  },
  logOutIcon: {
    marginLeft: 8,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  faqContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  faqTouch: {
    flexDirection: 'row',
    marginLeft: 18,
    alignItems: 'center',
  },
  faqText: {
    marginLeft: 14,
    color: COLOR.medium,
    fontSize: 14,
  },
});

export default styles;
