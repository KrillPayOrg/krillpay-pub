import COLOR from '@kp/constants/colors';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  header: {
    height: height * 0.1,
  },
  goBack: {
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: 'royalblue',
  },
  goBackContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
