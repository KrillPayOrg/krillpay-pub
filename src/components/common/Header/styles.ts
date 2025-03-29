import {StyleSheet, Dimensions, Platform} from 'react-native';
import FONT_FAMILY from '@kp/constants/fonts';
import COLOR from '@kp/constants/colors';
import {isSmallDevice} from '@kp/utils/helper';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
  },
  subContainer: {
    marginLeft: 6,
    width: '80%',
    marginTop: 2,
  },
  left: {
    left: 20,
  },
  navigationIcon: {
    marginLeft: Platform.OS == 'ios' ? 5 : 0,
  },
  notificationIcon: {
    flexDirection: 'row',
    marginRight: 12,
  },
  companyText: {
    fontFamily: FONT_FAMILY.interMedium,
    color: COLOR.white,
    fontSize: 20,
    bottom: 5,
  },
  header: {
    width: '100%',
    height: height * 0.225,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  headerText: {
    fontFamily: FONT_FAMILY.interSemiBold,
    color: COLOR.white,
    textAlign: 'center',
    fontSize: 24,
    // height: 35,
  },
  textLeft: {
    marginLeft: 35,
    textAlign: 'left',
  },
  centerVertical: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  leftVertical: {
    justifyContent: 'flex-start',
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  justifyGap: {
    justifyContent: 'space-between',
  },
  backContainer: {
    position: 'absolute',
    left: 0,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  importIcon: {
    top: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain',
    right: 5,
  },
  shareIcon: {
    right: 15,
    top: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  searchContainer: {
    alignSelf: 'center',
    width: '90%',
    position: 'absolute',
    bottom: isSmallDevice() ? 0 : 15,
  },
  label: {
    marginLeft: 12,
    marginBottom: 10,
    color: COLOR.white,
    fontFamily: FONT_FAMILY.interBold,
  },
  input: {
    fontSize: 16,
    backgroundColor: COLOR.white,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 48,
    right: 20,
  },
  iconImg: {height: 16, width: 16},
  homeLeftContainer: {
    width: '75%',
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  homeRightContainer: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default styles;
