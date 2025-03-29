import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, Platform, StyleSheet} from 'react-native';
const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
    backgroundColor: colorWithOpacity(COLOR.black, 55),
    width: '100%',
    zIndex: 101,
    height: height,
  },
  modalContainer: {
    width: 155,
    backgroundColor: COLOR.border,
    // height: 1,
  },
  error: {
    textAlign: 'center',
    marginBottom: 5,
    color: COLOR.red,
    fontSize: 13,
  },
  backContainer: {
    alignSelf: 'flex-end',
    width: 15,
    height: 15,
    marginBottom: 8,
  },
  backIcon: {
    width: 15,
    height: 15,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  modalView: {
    margin: 10,
    marginTop: 50,
    marginLeft: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dateModalView: {
    top: height * 0.3,
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  verificationModal: {
    top: height * 0.3,
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  verificationModalHeight: {
    // top: Platform.OS == 'ios' ? height * 0.2 : height * 0.14,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  skipButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: '30%',
    marginBottom: 20,
  },
  skipButtonHeight: {
    height: 40,
  },
  boldText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 16,
    color: COLOR.medium,
    textAlign: 'center',
  },
  regularText: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 14,
    color: colorWithOpacity(COLOR.darkGray, 0.5),
    textAlign: 'center',
  },
  started: {
    marginTop: 30,
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 16,
    color: COLOR.medium,
  },
  modalText: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'left',
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 16,
    color: colorWithOpacity(COLOR.medium, 50),
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 14,
    color: colorWithOpacity(COLOR.black, 0.4),
  },
  generateButton: {
    borderRadius: 10,
    marginTop: 15,
  },
  dateIcon: {
    width: 18,
    height: 20,
    resizeMode: 'contain',
  },
  verificationHeading: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
    textAlign: 'center',
    marginBottom: 10,
  },
  verificationText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.interRegular,
    color: colorWithOpacity(COLOR.darkGray, 0.5),
    textAlign: 'center',
  },
  formView: {
    top: 20,
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E6E6E6',
    width: '85%',
    marginBottom: 10,
  },
});

export default styles;
