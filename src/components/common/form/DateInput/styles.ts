import {StyleSheet} from 'react-native';
import COLOR from '@kp/constants/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderColor: COLOR.border,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 25,
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
  placeholder: {
    color: COLOR.gray,
  },
  text: {
    color: COLOR.black,
    flex: 1,
  },
});

export default styles;
