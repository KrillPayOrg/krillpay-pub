import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
    textAlign: 'center',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 14,
    color: COLOR.medium,
    textAlign: 'center',
    marginBottom: 16,
  },
  mt20: {
    // position: 'absolute',
    bottom: 24,
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: COLOR.white,
    borderRadius: 8,
    padding: 10,
    color: COLOR.medium,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colorWithOpacity(COLOR.medium, 0.4),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colorWithOpacity(COLOR.medium, 0.2),
  },
  flag: {
    marginRight: 12,
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  selectedItem: {
    backgroundColor: '#e0f7fa',
  },
  countryName: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.interRegular,
    color: COLOR.medium,
    flex: 1,
  },
  currency: {
    fontSize: 16,
    color: COLOR.medium,
  },
});
