import COLOR from '@kp/constants/colors';
import { isSmallDevice } from '@kp/utils/helper';
import {Dimensions, StyleSheet} from 'react-native';
const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.white,
    height: height,
  },
  header: {
    justifyContent: 'flex-start',
    height: height * 0.2,
  },
  recipientContainer: {
    height: isSmallDevice() ? height * 0.7 : height * 0.65,
    width: '100%',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  noContact:{flex:1,justifyContent:'center',alignItems:'center'},
  flatlistContainer:{
    paddingBottom:80
  }
});

export default styles;
