import {StyleSheet} from 'react-native';
import COLOR from '@kp/constants/colors';

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    borderRadius: 500,
    borderColor: '#D8D8D8',
    borderWidth: 1,
  },
  switchButton: {
    backgroundColor: COLOR.white,
    position: 'absolute',
    left: 0,
    borderRadius: 100,
  },
});

export default styles;
