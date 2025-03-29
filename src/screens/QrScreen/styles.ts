import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: COLOR.white,
    paddingHorizontal: 20,
  },
  qrWrapper: {
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    marginHorizontal: 10,
  },
  qrContainer: {
    padding: 30,
    paddingTop: 40,
  },
  qrBorder: {
    borderWidth: 4,
    padding: 16,
    borderColor: COLOR.primary,
    borderRadius: 10,
  },
  scanSub: {
    marginVertical: 10,
    fontFamily: FONT_FAMILY.interMedium,
    color: COLOR.medium,
    fontSize: 12,
  },
  viewShotStyle: {
    backgroundColor: COLOR.white,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  krillAppLogo: {
    maxHeight: 'auto',
    height: 45,
    width: 130,
    marginBottom: 30,
  },
  parentQrContainer: {
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: COLOR.primary,
  },
  receiveMoneyContainer: {
    backgroundColor: COLOR.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  receiveMoneyHeading: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.interSemiBold,
    color: COLOR.black,
  },
  receiveMoneyDes: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.interRegular,
    color: COLOR.black,
  },
  header: {
    height: height * 0.09,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  nameContainer: {
    borderWidth: 1,
    borderRadius: 16,
    position: 'absolute',
    top: -16,
    backgroundColor: COLOR.white,
    borderColor: COLOR.primary,
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
  name: {
    minWidth: 70,
    color: COLOR.medium,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: FONT_FAMILY.interSemiBold,
  },
  tag: {
    color: COLOR.medium,
    fontSize: 16,
    fontFamily: FONT_FAMILY.interMedium,
  },
});

export default styles;
