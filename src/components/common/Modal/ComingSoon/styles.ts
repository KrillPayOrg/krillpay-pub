import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';
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
  modalView: {
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
  generateButton: {
    borderRadius: 10,
    marginTop: 20,
  },
  modalText: {
    fontFamily: FONT_FAMILY.interBold,
    fontSize: 16,
    color: COLOR.medium,
    textAlign: 'center',
  },
});

export default styles;
