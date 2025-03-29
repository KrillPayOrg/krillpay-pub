import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
  mgT: {
    marginTop: height <= 800 ? height * 0.6 : height * 0.65,
  },
});

export default styles;
