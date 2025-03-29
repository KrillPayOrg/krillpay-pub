import {StyleSheet} from 'react-native';
import COLOR from '@kp/constants/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 50,
    borderColor: COLOR.border,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 12,
    color: COLOR.black,
  },
  icon: {
    color: COLOR.medium,
    fontSize: 20,
    marginRight: 10,
  },
  text: {
    height: 40,
    flex: 1,
    color: COLOR.black,
  },
});

export default styles;
