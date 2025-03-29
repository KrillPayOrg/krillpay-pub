import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import {isSmallDevice} from '@kp/utils/helper';
import {Dimensions, StyleSheet, Platform} from 'react-native';
const {height} = Dimensions.get('screen');

const buttonHeight = isSmallDevice()
  ? height * 0.12
  : Platform.select({
      ios: height * 0.09,
      default: height * 0.1,
    });

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  alignSelf: {
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    height: height * 0.12,
    justifyContent: 'space-between',
  },
  button: {
    height: buttonHeight,
    borderRadius: 10,
    borderWidth: 1,
    right: 5,
  },
  sendColor: {
    backgroundColor: colorWithOpacity(COLOR.mediumYellow, 10),
    borderColor: 'transparent',
  },
  exchangeColor: {
    backgroundColor: colorWithOpacity(COLOR.mediumGreen, 10),
    borderColor: 'transparent',
  },
  addMoney: {
    backgroundColor: colorWithOpacity(COLOR.mediumRed, 10),
    borderColor: 'transparent',
  },
  cashOut: {
    backgroundColor: colorWithOpacity(COLOR.lightBlue, 10),
    borderColor: 'transparent',
  },
  receive: {
    backgroundColor: colorWithOpacity(COLOR.purple, 10),
    borderColor: 'transparent',
  },
  nextCard: {position: 'absolute', right: '-70%'},
});

export default styles;
