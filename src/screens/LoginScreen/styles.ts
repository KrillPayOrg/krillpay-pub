import COLOR from '@kp/constants/colors';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Necessary for the loadingContainer to cover the entire screen
  },
  header: {
    height: height * 0.13,
    marginBottom: 20,
  },
  loadingContainer: {
    backgroundColor: COLOR.primaryLight, // Semi-transparent blue background to overlay the entire screen
  },
});

export default styles;
