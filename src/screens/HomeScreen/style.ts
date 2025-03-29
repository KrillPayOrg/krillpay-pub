import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    textAlign: 'left',
    fontSize: 20,
    height: height * 0.15,
  },
  carouselContainer: {
    flex: 1,
    position: 'absolute',
    marginTop: height * 0.05,
  },

  transactionContainer: {
    width: '100%',
    bottom: 0,
    paddingHorizontal: 5,
  },
  carousalStyle: {
    marginTop: height > 700 ? 0 : 12,
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
