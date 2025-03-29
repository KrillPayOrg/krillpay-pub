import Header from '@kp/components/common/Header';
import {CARD_TYPE, COMMON, WALLET_IMAGES} from '@kp/constants/appText';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import styles from './styles';
import WalletButton from '@kp/components/common/WalletButton';
import {useState} from 'react';
import {NavigationProp} from '@react-navigation/native';
import PATHS from '@kp/constants/paths';
import Papper from '@kp/components/common/Papper';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import {useWalletContext} from '@kp/context/walletType';
import Button from '@kp/components/common/Button';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';
import {useVerifyPinMutation} from '@kp/redux/service/users';
import {useExchangeMoneyMutation} from '@kp/redux/service/transaction';
import {showToast} from '@kp/utils/common';
import {URLS} from '@kp/constants/api';
import {post} from '@kp/client/services/api';
import SelectWallet from '@kp/components/common/SelectWallet';

interface Props {
  navigation: NavigationProp<any>;
}

/**
 * ExchangeMoney
 * - Allows users to exchange money between wallets
 * - Supports real-time conversion rate updates
 * - Verifies PIN before processing the exchange
 * - Navigates to transaction success or failure screens based on the response
 */
const ExchangeMoney = ({navigation}: Props) => {
  const {wallet, setWallet} = useWalletContext();
  const [cash, setCash] = useState<string>('0');
  const [usdc, setUsdc] = useState(0);
  const [conversionFee, setConversionFee] = useState(0);
  const secondFlag = wallet == CARD_TYPE.USD ? CARD_TYPE.USDC : CARD_TYPE.USD;
  const {accountType} = useAccountContext();
  const [verifyPin] = useVerifyPinMutation();
  const [showChangeWallet, setShowChangeWallet] = useState(false);
  const [exchangeMoney] = useExchangeMoneyMutation();

  /**
   * removeLeadingZeros
   * - Removes leading zeros from the input value while preserving a single zero if necessary
   */
  const removeLeadingZeros = (value: string) => {
    // Use regex to remove leading zeros, but keep a single zero if the value is "0" or "0."
    return value.replace(/^0+(?=\d)/, '');
  };

  /**
   * isValidFloat
   * - Checks if the given string is a valid floating-point number
   */
  const isValidFloat = (value: string) => {
    const floatRegex = /^[+-]?\d*\.?\d*$/;
    return floatRegex.test(value);
  };

  /**
   * handleValueChange
   * - Updates the input value and fetches conversion rates
   */
  const handleValueChange = async (newValue: string) => {
    if (newValue === '0' && cash === '0') {
      setCash('0');
      return;
    } else if (cash === '0' && newValue !== '.') {
      setCash(removeLeadingZeros(newValue));
      let fee;
      let totalAmount;
      try {
        const response = await post(URLS.getFeeWithAmount, {amount: newValue});
        fee = response.data.fee;
        totalAmount = response.data.totalAmount;
      } catch (error) {
        console.log(error, 'errr');
      }
      setConversionFee(fee);
      // const amount = (parseFloat(newValue) - commission).toFixed(2);
      setUsdc(parseFloat(totalAmount));
      return;
    }

    const limiter = wallet === CARD_TYPE.USDC ? 6 : 2;
    const decimalIndex = newValue.indexOf('.');
    if (
      decimalIndex !== -1 &&
      newValue.substring(decimalIndex + 1).length > limiter
    ) {
      return;
    }
    let fee;
    let totalAmount;
    try {
      const response = await post(URLS.getFeeWithAmount, {amount: newValue});
      fee = response.data.fee;
      totalAmount = response.data.totalAmount;
    } catch (error) {
      console.log(error, 'errr');
    }
    setCash(newValue);
    setConversionFee(fee);
    // const amount = (parseFloat(newValue) - commission).toFixed(2);
    setUsdc(parseFloat(totalAmount));
  };

  /**
   * updateCash
   * - Validates and updates the entered cash value
   */
  const updateCash = (value: string) => {
    if (!isValidFloat(value)) {
      return;
    }

    if (value === '.' && cash.includes('.')) {
      return;
    }

    if (cash === '0' && value === '0') {
      setCash('0');
      return;
    }

    if (cash === '0' && value !== '.') {
      const newValue = removeLeadingZeros(value);
      handleValueChange(newValue);
    } else {
      const newValue = value === '.' && cash === '' ? '0.' : value;

      if (newValue.length > 11) {
        return;
      }

      handleValueChange(newValue);
    }
  };

  /**
   * showSourceWallet
   * - Opens the wallet selection modal for individual accounts
   */
  const showSourceWallet = () => {
    if (accountType == AccountType.INDIVIDUAL) {
      setShowChangeWallet(true);
    }
  };

  /**
   * goBack
   * - Navigates back to the previous screen
   */
  const goBack = () => {
    navigation.goBack();
  };

  /**
   * handleSubmit
   * - Initiates the PIN verification process before executing the exchange
   */
  const handleSubmit = () => {
    if (parseFloat(cash) > 0) {
      navigation.navigate(MAIN_NAVIGATOR.Pin, {handlePinSubmit});
    }
  };

  /**
   * changeWallet
   * - Updates the selected wallet type
   */
  const changeWallet = (value: string | undefined) => {
    value && setWallet(CARD_TYPE[value]);
    setShowChangeWallet(false);
  };

  /**
   * handlePinSubmit
   * - Verifies the PIN and processes the exchange transaction
   */
  const handlePinSubmit = async ({pin}: any, setIsLoading: any) => {
    try {
      let isPinValid = true;
      const type = accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS';
      const payload = {
        pin: pin,
        accountType: type,
      };
      setIsLoading(true);
      //vertify user PIN
      try {
        await verifyPin(payload).unwrap(); // Pin verification
      } catch (error: any) {
        isPinValid = false; // Mark pin as invalid if it fails
        console.error('PIN verification failed:', error); // Log the error if needed
        // Don't navigate if pin verification fails
      }
      if (!isPinValid) {
        showToast('Invalid Pin, retry');
        return;
      }

      const exchangePayload = {
        side: wallet === 'USD' ? 'buy' : 'sell',
        amount: cash,
        accountType: type,
      };
      //exchange Wallet API call
      await exchangeMoney(exchangePayload).unwrap();
      navigation.navigate(MAIN_NAVIGATOR.TransactionComplete, {
        sell: cash,
        buy: usdc,
        Fee: conversionFee,
        isTrade: true,
      });
    } catch (error: any) {
      if ('data' in error) {
        navigation.navigate(MAIN_NAVIGATOR.TransactionFailure, {
          error: error.data.message,
        });
      } else {
        navigation.navigate(MAIN_NAVIGATOR.TransactionFailure, {
          error: COMMON.somethingWentWrong,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <Header
          title={COMMON.fromWallet}
          style={styles.header}
          isBackButton
          isLeftTitle
          goBack={goBack}
        />
        {!showChangeWallet && (
          <WalletButton
            onPress={showSourceWallet}
            type={wallet}
            style={styles.walletButton}
          />
        )}
        {showChangeWallet && (
          <SelectWallet
            type={wallet}
            changeWallet={changeWallet}
            style={styles.selectWallet}
            notAllowedWallet={[CARD_TYPE.NGN]}
          />
        )}
        {!showChangeWallet && (
          <>
            <View style={styles.top}>
              <Text style={[styles.text]}>{COMMON.sell}</Text>
              <View style={styles.cashContainer}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={styles.logo}
                    source={PATHS[WALLET_IMAGES[wallet]]}
                  />
                  <Text style={styles.lightText}>{CARD_TYPE.USD}</Text>
                </View>
                <TextInput
                  value={cash}
                  onChangeText={updateCash}
                  keyboardType="phone-pad"
                  returnKeyType="done"
                  style={[styles.titleContainer, styles.titles]}></TextInput>
              </View>
              <Papper style={styles.papper}>
                <Text style={styles.conversionText}>
                  {COMMON.conversionRate}
                </Text>
              </Papper>
              <View style={styles.conversionContainer}>
                <Text style={styles.feeText}>{COMMON.conversionFee}</Text>
                <Text style={[styles.feeText, styles.left]}>
                  {Number.isNaN(conversionFee) ? 0 : conversionFee}
                </Text>
              </View>
              <Text style={[styles.text, styles.buyContainer]}>
                {COMMON.buy}
              </Text>
              <View style={styles.cashContainer}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={styles.logo}
                    source={PATHS[WALLET_IMAGES[secondFlag]]}
                  />
                  <Text style={styles.lightText}>{CARD_TYPE.USD}</Text>
                </View>
                <TextInput editable={false} style={styles.titleContainer}>
                  <Text style={[styles.titles, styles.disabledColor]}>
                    {Number.isNaN(usdc) ? 0 : usdc}
                  </Text>
                </TextInput>
              </View>
              <View style={styles.buttonContainer}></View>
            </View>

            <Button
              title={COMMON.exchange}
              onPress={() => handleSubmit()}
              width={'90%'}
              style={styles.button}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ExchangeMoney;
