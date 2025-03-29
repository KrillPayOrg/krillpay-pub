import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    fontSize: 20,
    height: height * 0.06,
  },
  biometric: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between',
  },
  profileColor: {
    backgroundColor: colorWithOpacity(COLOR.lightPurple, 10),
  },
  avatarColor: {
    backgroundColor: colorWithOpacity(COLOR.lightRed, 10),
  },
  phoneNumColor: {
    backgroundColor: colorWithOpacity(COLOR.lightBlue, 10),
  },
  emailColor: {
    backgroundColor: colorWithOpacity(COLOR.lightGreen, 10),
  },
  biometricColor: {
    backgroundColor: colorWithOpacity(COLOR.lightBrown, 10),
  },
});

export default styles;
