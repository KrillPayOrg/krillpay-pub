import COLOR from '@kp/constants/colors';
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
    height: height * 0.2,
  },
  card: {
    position: 'absolute',
    top: height * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    height: height * 0.1,
    borderWidth: 0,
  },
  infoContainer: {
    marginTop: 20,
    width: '90%',
    borderColor: COLOR.border,
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'center',
  },
  depositText: {
    fontFamily: FONT_FAMILY.interRegular,
    fontSize: 15,
    color: COLOR.medium,
    textAlign: 'center',
  },
  textView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boldText: {
    fontFamily: FONT_FAMILY.interBold,
  },
  margin: {
    margin: 25,
  },
  bottomView: {
    marginTop: height * 0.2,
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    marginTop: 30,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    height: 55,
  },
  whiteText: {
    color: COLOR.white,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 16,
  },
});

export default styles;
