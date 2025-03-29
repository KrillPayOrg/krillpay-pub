import COLOR from '@kp/constants/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    left: 15,
    right: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    bottom: 0,
    shadowColor: COLOR.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    zIndex: 110,
    maxHeight: '100%',
    elevation: 9,
  },
  pressableContainer: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  sheet: {
    backgroundColor: COLOR.white,
    padding: 16,
    width: '100%',
    position: 'absolute',
    // bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 999,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    paddingVertical: 23,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
    height: '100%',
    flex: 1,
  },
});
