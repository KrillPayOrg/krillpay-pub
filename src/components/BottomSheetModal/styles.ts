import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  sheetConatiner: {
    backgroundColor: COLOR.white,
    height: 320,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,
    left: 8,
    right: 8,
    bottom: 5,
    borderWidth: 1,
    alignItems: 'stretch',
    paddingVertical: 15,
    padding: 15,
  },
  sheetChildContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  addMoney: {
    backgroundColor: COLOR.primary,
    alignItems: 'center',
    borderRadius: 20,
    padding: 12,
    width: '100%',
  },
  addMoneyText: {
    color: COLOR.white,
    fontFamily: FONT_FAMILY.interBold,
  },
  addMoneyDes: {
    fontFamily: FONT_FAMILY.interSemiBold,
    textAlign: 'center',
    color: COLOR.black,
  },
  addMoneyTitle: {
    fontFamily: FONT_FAMILY.interSemiBold,
    fontSize: 20,
    color: COLOR.black,
  },
});
