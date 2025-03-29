import {StyleSheet} from 'react-native';
import COLOR from '@kp/constants/colors';

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: COLOR.border,
    backgroundColor: COLOR.white,
    shadowColor: COLOR.shadowColor,
    shadowOffset: {width: 0, height: 16},
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
});

export default styles;
