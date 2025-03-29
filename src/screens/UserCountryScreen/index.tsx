import Header from '@kp/components/common/Header';
import {CARD_TYPE, COMMON} from '@kp/constants/appText';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {NavigationProp} from '@react-navigation/native';
import {useState} from 'react';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import Form from '@kp/components/common/form/Form';
import {countryList} from '@kp/constants';
import {ButtonT} from '@kp/constants/enum';
import Button from '@kp/components/common/Button';
import CountrySelect from '@kp/components/common/form/CountrySelect';
import {useWalletContext} from '@kp/context/walletType';
import {getDisplayText} from '@kp/utils/helper';

interface Props {
  navigation: NavigationProp<any>;
  route: any;
}

/**
 * UserCountryScreen screen
 * - Handles country selection for transactions
 * - Navigates to recipient or bank transfer screens based on conditions
 * - Uses wallet context to determine available actions
 */
const UserCountryScreen = ({navigation, route}: Props) => {
  const {fromNGN, cash, selectedCountry} = route.params ?? {};
  const {wallet} = useWalletContext();
  const goBack = () => {
    navigation.goBack();
  };

  /**
   * onPress
   * - Navigates to the recipient screen if a country is selected
   * - Navigates to Yellow Card Flow if the wallet is USDC
   */
  const onPress = () => {
    if (selectedCountry) {
      navigation.navigate(MAIN_NAVIGATOR.Recipient, {
        cash: cash,
        transactionCountry: CARD_TYPE.NGN,
        selectedCountry:selectedCountry
      });
    } else {
      if (wallet == CARD_TYPE.USDC) {
        navigation.navigate(MAIN_NAVIGATOR.YellowCardFlowScreen, {cash: cash});
      }
    }
  };

  /**
   * onPressUS
   * - Navigates to the bank transfer screen if the wallet is NGN
   */
  const onPressUS = () => {
    if (wallet == CARD_TYPE.NGN) {
      navigation.navigate(MAIN_NAVIGATOR.BankTransferScreen, {cash: cash});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={
          !fromNGN && !selectedCountry ? COMMON.selectCountry : COMMON.sendMoney
        }
        style={styles.header}
        isBackButton
        isLeftTitle
        goBack={goBack}
      />
      <View style={styles.subContainer}>
        {(fromNGN || selectedCountry) && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
              <Text style={styles.whiteText}>
                {getDisplayText(selectedCountry, wallet)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.buttonContainer}>
          {(fromNGN || selectedCountry) && (
            <TouchableOpacity
              onPress={onPressUS}
              style={styles.buttonComingSoon}>
              <Text style={styles.blackText}>
                {selectedCountry ? COMMON.bank : COMMON.US}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserCountryScreen;
