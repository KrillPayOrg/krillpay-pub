import Header from '@kp/components/common/Header';
import {
  CARD_TYPE,
  COMMON,
  CountryWallet,
  SEND_MONEY_TYPE,
  WALLET_IMAGES,
} from '@kp/constants/appText';
import {Alert, Image, Modal, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import WalletButton from '@kp/components/common/WalletButton';
import {useEffect, useState} from 'react';
import SelectWallet from '@kp/components/common/SelectWallet';
import {NavigationProp} from '@react-navigation/native';
import NumPad from '@kp/components/common/NumPad';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import {useWalletContext} from '@kp/context/walletType';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType, ButtonT} from '@kp/constants/enum';
import COLOR from '@kp/constants/colors';
import {
  formatCash,
  getWalletBalance,
  getWalletCashInDefaultCurrency,
  typeConversion,
} from '@kp/utils/helper';
import PATHS from '@kp/constants/paths';
import {useAppDispatch, useAppSelector} from '@kp/redux/slices';
import BlinkingAmount from '@kp/components/common/BlinkingCash';
import CountrySelectionScreen from '../CountryListScreen';
import {selectedCountryValues} from '@kp/constants';
import LoaderModal from '@kp/components/common/Modal/LoaderModal';
import {handleRateSelect} from '@kp/client/requests/yellowCard';
import Button from '@kp/components/common/Button';
import React from 'react';
import {toggleBalanceLoading} from '@kp/redux/slices/userSlice';
import BottomSheetModal from '@kp/components/BottomSheetModal';

interface Props {
  navigation: NavigationProp<any>;
  route: any;
}

/**
 * SendMoney Component
 * - Handles money transfer functionality within the app
 * - Allows selecting source wallet, entering cash amount, and sending money
 */
const SendMoney = ({navigation, route}: Props) => {
  const {walletBalances, balanceLoading} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const {accountType} = useAccountContext();
  const {wallet, setWallet} = useWalletContext();
  const {recipient} = route.params ?? {};
  const [showChangeWallet, setShowChangeWallet] = useState(false);
  const [enterCash, setEnterCash] = useState(false);
  const [cash, setCash] = useState('0');
  const [transactionRates, setTrasactionRates] = useState<Rate[]>();
  const [ratesLoading, setRatesLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [selectCountry, setSelectCountry] = useState(false);
  const [InsufficientToggle, setInsufficientToggle] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    CountryWallet[wallet], // Default to 'US' if the value is not found
  );

  const profileType = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';

  const rates = transactionRates
    ? transactionRates[0]
    : {buy: 1, sell: 1, code: wallet};

  const walletBalnce = getWalletCashInDefaultCurrency(
    walletBalances,
    profileType as keyof WalletBalance,
    wallet as keyof WalletBalance['ind'] | keyof WalletBalance['bus'],
  );

  /**
   * toggleEnterCash
   * - Toggles the cash input field
   */
  const toggleEnterCash = () => {
    if (recipient) {
      onPress();
    } else {
      setEnterCash(prev => !prev);
    }
  };

  /**
   * toggleCash
   * - Validates and toggles the cash input
   */
  const toggleCash = () => {
    if (cash < '1') {
      Alert.alert('Info', 'Entered amount should be at least 1.00');
      return;
    }

    setEnterCash(prev => !prev);
    if (Number(cash) > Number(walletBalnce)) {
      setInsufficientToggle(true);
      return;
    } else if (recipient) {
      onPress();
    }
  };

  /**
   * toggleCountrySelect
   * - Handles country selection and fetches rates if applicable
   */
  const toggleCountrySelect = async (value: string) => {
    setSelectedCountry(value);
    setSelectCountry(false);
    if (wallet == CARD_TYPE.USDC) {
      setRatesLoading(true);
      const data = await handleRateSelect(
        selectedCountryValues[value as keyof typeof selectedCountryValues]
          .currency,
      );
      setTrasactionRates(data);
      setRatesLoading(false);
    }
  };

  useEffect(() => {
    const positiveNumberRegex = /^(?=.*[1-9])\d*(?:\.\d+)?$/;
    if (positiveNumberRegex.test(cash)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [cash]);

  const showSourceWallet = () => {
    if (accountType == AccountType.INDIVIDUAL && !recipient) {
      setShowChangeWallet(true);
    }
  };

  const changeWallet = (value: string | undefined, id: string | undefined) => {
    value && setWallet(CARD_TYPE[value]);
    setShowChangeWallet(false);
    value && setSelectedCountry(CountryWallet[CARD_TYPE[value]]);
    setTrasactionRates(undefined);
  };

  /**
   * updateCash
   * - Handles numeric input for cash entry
   */
  const updateCash = (value: string) => {
    const floatRegex = /^[+-]?\d*\.?\d*$/;
    const limitDecimals = (newValue: string, limiter: number) => {
      const decimalIndex = newValue.indexOf('.');
      if (
        decimalIndex !== -1 &&
        newValue.substring(decimalIndex + 1).length > limiter
      ) {
        return true;
      }
      return false;
    };

    const handleBackspace = (value: string) => {
      if (value === 'X' && cash.length > 0) {
        setCash(prev => prev.slice(0, -1));
        return true;
      }
      return false;
    };

    const updateValue = (newValue: string) => {
      setCash(newValue);
    };

    const isValidFloat = (value: string) => floatRegex.test(value);

    if (handleBackspace(value)) return;

    if (!isValidFloat(value)) return;

    if (value === '.' && cash.includes('.')) return; // Prevent multiple decimals

    if (value === '0' && cash === '0') {
      updateValue('0');
      return;
    }

    if (cash === '0' && value !== '.') {
      updateValue(value);
      return;
    }

    const newValue = value === '.' && cash === '' ? '0.' : cash + value;

    if (newValue.length > 8) return;

    const decimalLimiter = wallet === CARD_TYPE.USDC ? 6 : 2;

    if (limitDecimals(newValue, decimalLimiter)) return;

    updateValue(newValue);
  };

  /**
   * onPress
   * - Navigates to different screens based on selected country and wallet type
   */
  const onPress = () => {
    if (Number(cash) > Number(walletBalnce)) {
      setInsufficientToggle(true);
      return;
    }

    if (wallet == CARD_TYPE.USD && selectedCountry == 'US') {
      recipient
        ? navigation.navigate(MAIN_NAVIGATOR.Review, {
            cash: cash,
            // type: typeConversion(recipient.mobileCountry),
            type: typeConversion(recipient.type),
            avatar: recipient.avatar,
            accountHolder: recipient.accountHolder,
            krillTag: recipient.krillTag,
            mobileNumber: recipient.mobileNumber,
            beneficiaryWalletId: recipient.beneficiaryWalletId,
            beneficiaryNubanNumber: recipient.partnerWalletId,
          })
        : navigation.navigate(MAIN_NAVIGATOR.Recipient, {
            cash: cash,
            selectedCountry: selectedCountry,
          });
    } else if (wallet == CARD_TYPE.USDC) {
      if (selectedCountry !== 'US') {
        navigation.navigate(MAIN_NAVIGATOR.YellowCardFlowScreen, {
          cash: cash,
          rates: transactionRates,
          country: selectedCountry,
        });
      } else {
        navigation.navigate(MAIN_NAVIGATOR.Recipient, {
          cash: cash,
          transactionCountry: CARD_TYPE.USD,
          selectedCountry: selectedCountry,
        });
      }
    } else {
      recipient
        ? navigation.navigate(MAIN_NAVIGATOR.Review, {
            cash: cash,
            // type: typeConversion(recipient.mobileCountry),
            type: typeConversion(recipient.type),
            avatar: recipient.avatar,
            accountHolder: recipient.accountHolder,
            krillTag: recipient.krillTag,
            mobileNumber: recipient.mobileNumber,
            beneficiaryWalletId: recipient.beneficiaryWalletId,
            beneficiaryNubanNumber: recipient.partnerWalletId,
          })
        : selectedCountry == 'US'
        ? navigation.navigate(MAIN_NAVIGATOR.Recipient, {
            cash: cash,
            transactionCountry: CARD_TYPE.NGN,
            selectedCountry: selectedCountry,
          })
        : navigation.navigate(MAIN_NAVIGATOR.UserCountryScreen, {
            fromNGN: true,
            selectedCountry: selectedCountry,
            cash: cash,
          });
    }
  };

  const goBack = () => {
    if (showChangeWallet) {
      setShowChangeWallet(prev => !prev);
    } else {
      navigation.goBack();
    }
  };

  const handleAddMoney = () => {
    setInsufficientToggle(false);
    if (wallet == CARD_TYPE.USD && selectedCountry == 'US') {
      navigation.navigate(MAIN_NAVIGATOR.PlaidView, {type: 'addMoney'});
    } else {
      navigation.navigate(MAIN_NAVIGATOR.Deposit);
    }
  };

  const handleClose = () => setInsufficientToggle(false);

  useEffect(() => {
    return () => {
      setRatesLoading(false);
      dispatch(toggleBalanceLoading(false));
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LoaderModal modalVisible={balanceLoading || ratesLoading} />
      {!selectCountry && (
        <Header
          title={
            showChangeWallet ? COMMON.selectSourceWallet : COMMON.fromWallet
          }
          style={styles.header}
          isBackButton
          isLeftTitle
          goBack={goBack}
        />
      )}
      {showChangeWallet && (
        <SelectWallet
          type={wallet}
          changeWallet={changeWallet}
          style={styles.selectWallet}
        />
      )}

      {!showChangeWallet && recipient && (
        <WalletButton
          type={wallet}
          onPress={showSourceWallet}
          style={styles.walletButton}
        />
      )}

      {selectCountry && (
        <>
          <Header
            title={COMMON.selectCountry}
            style={styles.headerCountry}
            isBackButton
            isLeftTitle
            goBack={() => setSelectCountry(prev => !prev)}
          />
          <CountrySelectionScreen
            wallet={wallet}
            toggleCountrySelect={toggleCountrySelect}
          />
        </>
      )}
      {(enterCash || recipient) && (
        <View style={styles.top}>
          <View style={styles.input}>
            <Text style={styles.cash}>{cash}</Text>
          </View>
          <NumPad updateCash={updateCash} style={styles.numPadContainer} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={disable}
              onPress={toggleCash}
              style={[
                styles.button,
                disable
                  ? {backgroundColor: COLOR.disableColor}
                  : {backgroundColor: COLOR.primary},
              ]}>
              <Text style={styles.text}>{COMMON.next}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!showChangeWallet && !enterCash && !selectCountry && (
        <View style={styles.buttonContainer}>
          <View style={styles.top}>
            <View style={styles.verifyContainer}>
              <View>
                <Text style={styles.sendText}>{COMMON.youSend}</Text>
                <BlinkingAmount
                  color={InsufficientToggle ? COLOR.red : COLOR.medium}
                  cash={cash}
                  toggleEnterCash={toggleEnterCash}
                />
              </View>
              <View style={styles.amountParent}>
                <TouchableOpacity
                  onPress={showSourceWallet}
                  style={styles.amountContainer}>
                  <Image
                    style={styles.logo}
                    source={PATHS[WALLET_IMAGES[wallet]]}
                  />
                  <Text style={styles.amountText}>
                    {SEND_MONEY_TYPE[wallet]}
                  </Text>
                  <Image style={styles.backIcon} source={PATHS.downIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.midContainer}>
              <View
                style={{
                  width: 1,
                  flex: 1,
                  backgroundColor: COLOR.border,
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <Image style={styles.logoVerify} source={PATHS.arrowCircle} />
                <Text style={[styles.logoText, {right: 6}]}>
                  Wallet Balance:{' '}
                  {getWalletBalance(
                    walletBalances,
                    profileType as keyof WalletBalance,
                    wallet as
                      | keyof WalletBalance['ind']
                      | keyof WalletBalance['bus'],
                  )}
                </Text>
              </View>
              <View
                style={{
                  width: 1,
                  flex: 1,
                  backgroundColor: COLOR.border,
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.lightingVerify}
                  source={PATHS.lightningCircle}
                />
                <Text style={[styles.logoText, {right: 4}]}>
                  1.00 {SEND_MONEY_TYPE[wallet]} = {rates.buy} {rates.code}
                </Text>
              </View>
              <View
                style={{
                  width: 1,
                  flex: 1,
                  backgroundColor: COLOR.border,
                }}
              />
            </View>
            <View style={styles.verifyContainer}>
              <View>
                <Text style={styles.sendText}>{COMMON.receiverGets}</Text>
                <Text style={styles.sendAmount}>
                  {cash ? (parseFloat(cash) * rates.buy).toFixed(2) : '0.00'}{' '}
                </Text>
              </View>
              <View style={styles.amountParent}>
                <TouchableOpacity
                  onPress={() => setSelectCountry(prev => !prev)}
                  style={styles.amountContainer}>
                  <Image
                    style={styles.logo}
                    source={
                      selectedCountryValues[
                        (selectedCountry as keyof typeof selectedCountryValues) ||
                          'US'
                      ].image
                    }
                  />
                  <Text style={styles.amountText}>
                    {
                      selectedCountryValues[
                        (selectedCountry as keyof typeof selectedCountryValues) ||
                          'US'
                      ].currency
                    }
                  </Text>
                  <Image style={styles.backIcon} source={PATHS.downIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Button
            title={COMMON.continue}
            type={ButtonT.default}
            onPress={onPress}
            disabled={disable}
            style={[
              styles.mt20,
              disable
                ? {backgroundColor: COLOR.disableColor}
                : {backgroundColor: COLOR.primary},
            ]}
          />
        </View>
      )}
      <BottomSheetModal
        visible={InsufficientToggle}
        setVisible={setInsufficientToggle}
        handlePress={handleAddMoney}
        handleClose={handleClose}
      />
    </SafeAreaView>
  );
};

export default SendMoney;
