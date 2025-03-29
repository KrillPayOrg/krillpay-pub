import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
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
    height: height * 0.06,
  },
  semiBold: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 18,
    alignSelf: 'center',
    color: COLOR.medium,
    marginLeft: 12,
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
  backIcon: {
    height: 18,
    width: 18,
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
  contentScroll: {
    width: '100%',
    padding: 0,
  },
  icon: {
    height: 25,
    width: 25,
  },
  content: {
    gap: 15,
    display: 'flex',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
  },
  qrIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  subContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  profileLogo: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 25,
  },
  text: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 18,
    color: COLOR.medium,
    alignSelf: 'center',
    marginLeft: 10,
  },
  settingContainer: {
    borderBottomColor: COLOR.gray,
    borderBottomWidth: 1,
    marginVertical: 10,
    marginTop: 10,
  },
  profileColor: {
    backgroundColor: colorWithOpacity(COLOR.lightPurple, 10),
  },
  avatarColor: {
    backgroundColor: colorWithOpacity(COLOR.lightRed, 10),
  },
  securityColor: {
    backgroundColor: colorWithOpacity(COLOR.lightGreen, 10),
  },
});

export default styles;
