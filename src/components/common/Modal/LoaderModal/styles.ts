import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import {Dimensions, StyleSheet} from 'react-native';
const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    position: 'absolute',
    backgroundColor: colorWithOpacity(COLOR.black, 20),
    width: '100%',
    zIndex: 101,
    height: height,
  },
  modalView: {
    height: height * 0.1,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 1,
  },
});

export default styles;
