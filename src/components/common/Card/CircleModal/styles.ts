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
  infoModal: {
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
  text: {
    marginTop: 20,
    fontFamily: FONT_FAMILY.interMedium,
    fontSize: 14,
    color: colorWithOpacity(COLOR.black, 50),
    textAlign: 'center',
  },
  started: {
    marginTop: 30,
    borderRadius: 10,
  },
});

export default styles;
