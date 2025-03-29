import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {isSmallDevice} from '@kp/utils/helper';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    fontSize: 20,
    height: isSmallDevice() ? height * 0.07 : height * 0.06,
  },
  mt20: {
    marginTop: 20,
  },
  profileLogo: {
    width: 100,
    height: 100,
    // resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLOR.white,
    overflow: 'hidden',
  },
  semiBold: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 18,
    alignSelf: 'center',
    color: COLOR.medium,
  },
  top: {
    marginTop: 20,
  },
  left: {
    marginLeft: 20,
  },
  card: {
    alignSelf: 'center',
    height: 60,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  logo: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  logoContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  shieldColor: {
    backgroundColor: colorWithOpacity(COLOR.lightBrown, 10),
  },
  messageColor: {
    backgroundColor: colorWithOpacity(COLOR.lightGreen, 10),
  },
  callColor: {
    backgroundColor: colorWithOpacity(COLOR.lightRed, 10),
  },
  profileColor: {
    backgroundColor: colorWithOpacity(COLOR.lightPurple, 10),
  },
  dobColor: {
    backgroundColor: colorWithOpacity(COLOR.mediumBlue, 10),
  },
  addressColor: {
    backgroundColor: colorWithOpacity(COLOR.lightBrown, 10),
  },
  countryColor: {
    backgroundColor: colorWithOpacity(COLOR.pink, 10),
  },
  stateColor: {
    backgroundColor: colorWithOpacity(COLOR.lightGreen, 10),
  },
  cityColor: {
    backgroundColor: colorWithOpacity(COLOR.lightBrown, 10),
  },
  blurText: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 10,
    color: colorWithOpacity(COLOR.medium, 55),
  },
  text: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 14,
    color: COLOR.medium,
  },
  contentScroll: {
    width: '100%',
    padding: 0,
  },
  content: {
    gap: 15,
    display: 'flex',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -22,
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageButtonText: {
    color: COLOR.black,
    fontSize: 16,
  },
  backIcon: {
    height: 18,
    width: 18,
  },
  icon: {
    height: 25,
    width: 25,
  },
  InitialsView: {
    height: 100,
    width: 100,
    margin: 10,
    borderRadius: 50,
    backgroundColor: COLOR.BlueShadow,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  initialaText: {
    fontSize: 32,
    color: COLOR.darkBlue,
    fontFamily: FONT_FAMILY.interBold,
  },
});

export default styles;
