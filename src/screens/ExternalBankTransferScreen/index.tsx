import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from './styles';

import {useAccountContext} from '@kp/context/accountType';
import {AccountType, ExternalTransferType} from '@kp/constants/enum';
import Header from '@kp/components/common/Header';
import {PiggyBankIcon} from 'lucide-react-native';
import Button from '@kp/components/common/Button';
import Papper from '@kp/components/common/Papper';
import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import {
  COMMON,
  EXTERNAL_BANK_TRANSFER,
  EXTERNAL_BANK_TRANSFER_TYPE,
} from '@kp/constants/appText';
import {useNavigation} from '@react-navigation/native';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import {useVerifyPinMutation} from '@kp/redux/service/users';
import {get, post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import ExternalTransferCard from '@kp/components/ExternalTransferTypeCard';
import {removeCommas, truncateWithEllipsis} from '@kp/utils/helper';
import {showToast} from '@kp/utils/common';

const ExternalBankTransferScreen = ({route}: any) => {
  const {externalBank, title, sourceWalletId, balance} = route.params;
  const {navigate} = useNavigation<any>();
  const {accountType} = useAccountContext();
  const [seletedTransferType, setSelectedTransferType] = useState(
    ExternalTransferType.FUNDING,
  );
  const type = accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS';
  const [verifyPin] = useVerifyPinMutation();
  const [amount, setAmount] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [bankBalance, setBankBalance] = useState<any>(null);

  /**
   * getExternalBankBalance
   * - Fetches the available balance of the external bank account
   * - Handles errors by displaying an alert
   */
  const getExternalBankBalance = async () => {
    try {
      const response = await get(
        `${URLS.getBankBalance}?guid=${externalBank.guid}`,
      );
      setBankBalance(response.data.available);
    } catch (error) {
      Alert.alert(`${error ? error : 'Error: Something Went Wrong!'}`);
    }
  };

  useEffect(() => {
    if (externalBank.guid) {
      getExternalBankBalance();
    }
  }, [externalBank]);

  /**
   * isValidFloat
   * - Validates if a given string is a valid float number
   */
  const isValidFloat = (value: string) => {
    const floatRegex = /^[+-]?\d*\.?\d*$/;
    return floatRegex.test(value);
  };

  /**
   * handleAmountChange
   * - Manages user input for the amount field
   * - Restricts decimal places and total length
   */
  const handleAmountChange = (newValue: string) => {
    const limiter = 2;
    const decimalIndex = newValue.indexOf('.');

    if (newValue.length > 11) {
      return;
    }

    if (
      decimalIndex !== -1 &&
      newValue.substring(decimalIndex + 1).length > limiter
    ) {
      return;
    }

    setAmount(newValue);
  };

  /**
   * onChangeAmount
   * - Handles changes in the amount input field
   * - Ensures valid numeric input and prevents multiple decimal points
   */
  const onChangeAmount = (value: string) => {
    if (!isValidFloat(value)) {
      return;
    }

    if (value === '.' && amount.includes('.')) {
      return;
    }

    if (value === '0' && amount === '0') {
      setAmount('0');
      return;
    }

    if (amount === '0' && value !== '.') {
      setAmount(value);
      return;
    }

    const newValue = value === '.' && amount === '' ? '0.' : value;

    handleAmountChange(newValue);
  };

  /**
   * handleCashOut
   * - Initiates a cash-out transaction to the external bank account
   */
  const handleCashOut = async () => {
    try {
      const body = {
        amount: amount,
        transfer_type: seletedTransferType,
        external_bank_account_guid: externalBank.guid,
        accountType: type,
        sourceWalletId: sourceWalletId,
      };
      await post(URLS.addMoneyToExternlaBank, body);
    } catch (error) {
      console.log(error, 'err');
      throw error;
    }
  };

  /**
   * handleTransferType
   * - Sets the selected transfer type based on user input
   */
  const handleTransferType = (type: ExternalTransferType) => {
    setSelectedTransferType(type);
  };

  /**
   * handleAddMoney
   * - Handles adding money from the external bank account
   */
  const handleAddMoney = async () => {
    try {
      const body = {
        amount: amount,
        transfer_type: seletedTransferType,
        external_bank_account_guid: externalBank.guid,
        accountType: type,
        sourceWalletId: sourceWalletId,
      };
      await post(URLS.addMoneyFromExternalBank, body);
    } catch (error) {
      console.log(error, 'err');
      throw error;
    }
  };

  /**
   * handlePinSubmit
   * - Handles PIN verification before initiating a transaction
   */
  const handlePinSubmit = async ({pin}: any, setIsLoading: any) => {
    try {
      let isPinValid = true;
      const payload = {
        pin: pin,
        accountType: type,
      };
      setIsLoading(true);
      //vertify user PIN
      try {
        await verifyPin(payload).unwrap();
      } catch (error: any) {
        isPinValid = false; // Mark pin as invalid if it fails
        console.error('PIN verification failed:', error); // Log the error if needed
        // Don't navigate if pin verification fails
      }
      if (!isPinValid) {
        showToast('Invalid Pin, retry');
        return;
      }
      title == 'Deposit' ? await handleAddMoney() : await handleCashOut();
      navigate(MAIN_NAVIGATOR.TransactionComplete, {
        bankTransaction: true,
        cash: amount,
        type,
        accountHolder: externalBank.plaid_account_name,
        bankName: externalBank.account_kind,
        accountNum: externalBank.plaid_account_mask,
      });
    } catch (error: any) {
      console.log(error, 'errrr');
      if (error) {
        navigate(MAIN_NAVIGATOR.TransactionFailure, {error});
      } else {
        navigate(MAIN_NAVIGATOR.TransactionFailure, {
          error: COMMON.somethingWentWrong,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (amount == '') {
      setAmount(null);
    }
    if (title == 'Deposit') {
      parseFloat(amount) > parseFloat(bankBalance)
        ? setError('Insufficient Funds')
        : setError(null);
    } else {
      parseFloat(amount) > parseFloat(removeCommas(balance.toString()))
        ? setError('Insufficient Funds')
        : setError(null);
    }
  }, [amount]);

  /**
   * depositCash
   * - depositCash a transaction
   */
  const depositCash = () => {
    if (parseFloat(amount) > 0 && title == 'Deposit') {
      if (parseFloat(amount) <= parseFloat(bankBalance)) {
        navigate(MAIN_NAVIGATOR.Pin, {handlePinSubmit});
      }
    } else if (
      parseFloat(amount) > 0 &&
      parseFloat(amount) <= parseFloat(balance) &&
      title == 'Withdraw'
    ) {
      navigate(MAIN_NAVIGATOR.Pin, {handlePinSubmit});
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: COLOR.white}}
      behavior="height">
      <Header
        style={styles.header}
        title={EXTERNAL_BANK_TRANSFER_TYPE[title]}
        isLeftTitle
        isBackButton
      />
      <Papper style={styles.card}>
        <Text style={styles.text}>{title}</Text>
      </Papper>
      <View style={{flex: 1}}>
        {title == 'Deposit' ? (
          <View style={{flex: 1, margin: 10, marginLeft: 24}}>
            <Text style={styles.bankText}>Bank Account</Text>
            <View
              style={{
                width: '95%',
                marginTop: 8,
                padding: 24,
                borderWidth: 1,
                alignSelf: 'flex-start',
                borderColor: colorWithOpacity(COLOR.black, 20),
                borderRadius: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <PiggyBankIcon
                  size={32}
                  color={COLOR.black}
                  strokeWidth={2}
                  style={{marginRight: 8}}
                />
                <View style={{flex: 1}}>
                  <Text numberOfLines={1} style={styles.textExternal}>
                    {truncateWithEllipsis(externalBank.name, 15)}
                  </Text>
                  <Text style={styles.textExternal}>
                    {externalBank.plaid_account_mask}
                  </Text>
                </View>
                {!bankBalance && (
                  <ActivityIndicator size={'small'} color={COLOR.primary} />
                )}
                <Text style={styles.textExternal}>
                  {bankBalance} {externalBank.asset}
                </Text>
              </View>
            </View>
            <Text style={styles.bankText}>Amount</Text>

            <View style={styles.amountContainer}>
              <Text style={styles.textUSD}>USD</Text>
              <View style={styles.verticalLine} />
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                onChangeText={value => onChangeAmount(value)}
                keyboardType="number-pad"
                returnKeyType="done"
                value={amount}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <Text style={[styles.ACHText, {marginTop: 2}]}>
              ACH bank deposit may take up to 3 days.
            </Text>
          </View>
        ) : (
          <View style={{flex: 1, margin: 10, marginLeft: 24}}>
            <Text style={styles.balanceText}>$ {balance}</Text>
            <Text style={styles.bankText}>Bank Account</Text>
            <View
              style={{
                width: '95%',
                marginTop: 8,
                padding: 24,
                borderWidth: 1,
                alignSelf: 'flex-start',
                borderColor: colorWithOpacity(COLOR.black, 20),
                borderRadius: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <PiggyBankIcon
                  size={32}
                  color={COLOR.black}
                  strokeWidth={2}
                  style={{marginRight: 8}}
                />
                <View style={{flex: 1}}>
                  <Text style={styles.textExternal}>{externalBank.name}</Text>
                  <Text style={styles.textExternal}>
                    {externalBank.plaid_account_mask}
                  </Text>
                </View>
                <Text style={styles.textExternal}>{externalBank.asset}</Text>
              </View>
            </View>
            <Text style={styles.bankText}>Amount</Text>

            <View style={styles.amountContainer}>
              <Text style={styles.textUSD}>USD</Text>
              <View style={styles.verticalLine} />
              <TextInput
                style={styles.input}
                placeholder="Enter Amount"
                onChangeText={value => onChangeAmount(value)}
                keyboardType="number-pad"
                returnKeyType="done"
                value={amount}
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <Text style={[styles.ACHText, {marginTop: 2}]}>
              Same-day ACH: 1-2 days (free)
            </Text>
            {/* <Text style={[styles.text, {marginTop: 24}]}>
                Choose Payment Method
              </Text>
              <View>
                <ExternalTransferCard
                  isActive={
                    seletedTransferType === ExternalTransferType.FUNDING
                  }
                  type={ExternalTransferType.FUNDING}
                  title={EXTERNAL_BANK_TRANSFER[ExternalTransferType.FUNDING]}
                  onPress={handleTransferType}
                />
                <ExternalTransferCard
                  isActive={
                    seletedTransferType === ExternalTransferType.INSTANT_FUNDING
                  }
                  type={ExternalTransferType.INSTANT_FUNDING}
                  title={
                    EXTERNAL_BANK_TRANSFER[ExternalTransferType.INSTANT_FUNDING]
                  }
                  onPress={handleTransferType}
                />
              </View> */}
          </View>
        )}
      </View>
      <View
        style={{
          marginBottom: 24,
        }}>
        <Button
          width={'80%'}
          onPress={depositCash}
          style={
            !!error || !bankBalance || !amount || parseFloat(amount) <= 0
              ? styles.disabledButton
              : styles.button
          }
          disabled={
            !!error || !bankBalance || !amount || parseFloat(amount) <= 0
          }
          title={title}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ExternalBankTransferScreen;
