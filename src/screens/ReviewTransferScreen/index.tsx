import Header from '@kp/components/common/Header';
import {
  CARD_SYMBOL,
  CARD_TYPE,
  COMMON,
  FLAG_TYPE,
  SEND_MONEY_TYPE,
  WALLET_IMAGES,
  WALLET_TEXT,
} from '@kp/constants/appText';
import {NavigationProp} from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import Papper from '@kp/components/common/Papper';
import {useWalletContext} from '@kp/context/walletType';
import Form from '@kp/components/common/form/Form';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import {AccountType, ButtonT, FieldType} from '@kp/constants/enum';
import moment from 'moment';
import {
  useNgnExternalTransferMutation,
  useNgnInternalTransferMutation,
  useNgnGetChargePerAmountMutation,
  useUsBookTransferChargeMutation,
} from '@kp/redux/service/ngn';
import Button from '@kp/components/common/Button';
import {useVerifyPinMutation} from '@kp/redux/service/users';
import {useAccountContext} from '@kp/context/accountType';
import {useEffect, useState} from 'react';
import {useAppSelector} from '@kp/redux/slices';
import {useUsInternalbookTransferMutation} from '@kp/redux/service/transaction';
import COLOR from '@kp/constants/colors';
import {calculateAmount} from '@kp/utils/helper';
import {showToast} from '@kp/utils/common';
import React from 'react';
import FormSelect from '@kp/components/common/form/FormSelect';
import {reasons} from '@kp/constants';
import * as Yup from 'yup';
interface Props {
  navigation: NavigationProp<any>;
  route: any;
}

/**
 * ReviewTransfer Component
 * - Displays a review screen before a financial transfer
 * - Integrates with wallet and transaction contexts
 * - Handles both internal and external transfers
 */
const ReviewTransfer = ({navigation, route}: Props) => {
  const {
    bankTransaction,
    cash,
    bankName,
    accountNum,
    accountHolder,
    type,
    bankCode,
    avatar,
    krillTag,
    mobileNumber,
    beneficiaryWalletId,
    beneficiaryNubanNumber,
  } = route.params ?? {};
  const {wallet} = useWalletContext();
  //RTK Quries
  const [ngnInternalTransfer] = useNgnInternalTransferMutation();
  const [ngnExternalTransfer] = useNgnExternalTransferMutation();
  const [verifyPin] = useVerifyPinMutation();
  const [usInternalbookTransfer] = useUsInternalbookTransferMutation();
  const [ngnGetChargePerAmount, {isLoading: ngnChargeLoading}] =
    useNgnGetChargePerAmountMutation();
  const [usBookTransferCharge] = useUsBookTransferChargeMutation();
  //Custom Hooks
  const {accountType} = useAccountContext();
  const {userWallets}: any = useAppSelector(state => state.user);
  const [charge, setCharge] = useState<any>(null);
  const [totalAmount, setTotalAmount] = useState<any>(null);
  //Custom Funcation
  const goBack = () => {
    navigation.goBack();
  };

  /**
   * getTransactionCharge
   * - Fetches transaction fees for internal or external transfers
   */
  const getTransactionCharge = async () => {
    const index = userWallets?.[accType]?.findIndex(
      (eachWallet: any) => eachWallet.walletCurrency === wallet,
    );
    const recipientNubanNumber = beneficiaryNubanNumber
      ? beneficiaryNubanNumber
      : accountNum;
    const nubanNumber =
      userWallets?.[accType]?.[index ? index : 0]?.partnerWalletId;
    const sourceWalletId = userWallets?.[accType]?.[index ? index : 0]?.id;
    try {
      const body = {
        asset: wallet,
        beneficiaryWalletId: beneficiaryWalletId,
        sourceWalletId: sourceWalletId,
        amount: cash,
      };
      if (wallet == CARD_TYPE.USD || wallet == CARD_TYPE.USDC) {
        const response = await usBookTransferCharge(body).unwrap();
        if (parseFloat(response.fee) > 0) {
          setCharge(response.fee);
          const totalAmount = (
            parseFloat(cash) + parseFloat(response.fee)
          ).toString();
          setTotalAmount(totalAmount);
        }
      } else {
        const ngnBody = {
          amount: cash,
          nubanNumber: nubanNumber,
          recipientNubanNumber: recipientNubanNumber,
        };
        const response = await ngnGetChargePerAmount(ngnBody).unwrap();
        if (parseFloat(response.charge) > 0) {
          setCharge(response.charge);
          setTotalAmount(response.totalAmount);
        } else if (parseFloat(response.charge) == 0) {
          setCharge('0');
          setTotalAmount(cash);
        }
      }
    } catch (error) {
      console.log(error, 'err');
    }
  };

  useEffect(() => {
    getTransactionCharge();
  }, []);

  const accType = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';

  /**
   * ExternalTransactionInitiation
   * - Navigates to the PIN input screen for external transfers
   */
  const ExternalTransactionInitiation = () => {
    navigation.navigate(MAIN_NAVIGATOR.Pin, {handlePinSubmit});
  };

  /**
   * handlePinSubmit
   * - Handles PIN verification and processes external transfers
   */
  const handlePinSubmit = async ({pin}: any, setIsLoading: any) => {
    try {
      const index = userWallets?.[accType]?.findIndex(
        (eachWallet: any) => eachWallet.walletCurrency === wallet,
      );
      const type = accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS';
      const payload = {
        pin: pin,
        accountType: type,
      };
      setIsLoading(true);
      //vertify user PIN
      await verifyPin(payload).unwrap();
      const ngnExternalTransferPayload = {
        bankCode: bankCode,
        sourceWalletId: userWallets?.[accType]?.[index ? index : 0]?.id,
        beneficiaryAccountTitle: accountHolder,
        beneficiaryAccountNumber: accountNum,
        narration: `Funds transfer to accountNumber: ${accountNum}`,
        amount: cash,
      };
      //External Bank Transfer
      await ngnExternalTransfer(ngnExternalTransferPayload).unwrap();
      setIsLoading(false);
      navigation.navigate(MAIN_NAVIGATOR.TransactionComplete, {
        bankTransaction: bankTransaction,
        cash: cash,
        type,
        accountHolder,
        bankName,
        accountNum,
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

  /**
   * handleSubmit
   * - Navigates to PIN input screen for internal transfers
   */
  const handleSubmit = async (values: any) => {
    navigation.navigate(MAIN_NAVIGATOR.Pin, {
      handlePinSubmit: (pin: any, setIsLoading: any) =>
        handleInternalPinTransaction(pin, setIsLoading, values),
    });
  };

  /**
   * verifyUserPin
   * - Verifies user PIN before transaction
   */
  const verifyUserPin = async (pin: string, accountType: string) => {
    const payload = {
      pin,
      accountType,
    };
    await verifyPin(payload).unwrap();
  };

  /**
   * createNgnTransferPayload
   * - Creates payload for NGN internal transfer
   */
  const createNgnTransferPayload = (
    values: any,
    cash: string,
    userWallets: any,
    accType: any,
    wallet: string,
  ) => {
    const index = userWallets?.[accType]?.findIndex(
      (eachWallet: any) => eachWallet.walletCurrency === wallet,
    );
    return {
      beneficiaryWalletId: beneficiaryWalletId,
      sourceWalletId: userWallets?.[accType]?.[index ? index : 0]?.id,
      narration:
        values.comments || `Funds transfer to mobileNumber: ${mobileNumber}`,
      amount: cash,
      reason: values.comments,
    };
  };

  /**
   * createUsInternalTransferPayload
   * - Creates payload for USD/USDC internal transfer
   */
  const createUsInternalTransferPayload = (
    values: any,
    cash: string,
    userWallets: any,
    accType: any,
    wallet: string,
  ) => {
    const index = userWallets?.[accType]?.findIndex(
      (eachWallet: any) => eachWallet.walletCurrency === wallet,
    );
    return {
      asset: wallet,
      beneficiaryWalletId: beneficiaryWalletId,
      sourceWalletId: userWallets?.[accType]?.[index ? index : 0]?.id,
      amount: cash,
      note: values.comments || '',
      reason: values.comments,
    };
  };

  /**
   * handleInternalPinTransaction
   * - Handles PIN verification and processes internal transfers
   */
  const handleInternalPinTransaction = async (
    {pin}: any,
    setIsLoading: any,
    values: any,
  ) => {
    try {
      let isPinValid = true;
      const userType = accountType === AccountType.INDIVIDUAL ? 'IND' : 'BUS';

      setIsLoading(true);

      try {
        await verifyUserPin(pin, userType); // Pin verification
      } catch (error: any) {
        isPinValid = false; // Mark pin as invalid if it fails
        console.error('PIN verification failed:', error); // Log the error if needed
        // Don't navigate if pin verification fails
      }

      if (!isPinValid) {
        showToast('Invalid Pin, retry');
        return;
      }

      if (wallet === 'NGN') {
        const ngnInternalTransferPayload = createNgnTransferPayload(
          values,
          cash,
          userWallets,
          accType,
          wallet,
        );
        await ngnInternalTransfer(ngnInternalTransferPayload).unwrap();
        navigateToTransactionComplete();
      }

      if (wallet === 'USD' || wallet === 'USDC') {
        const usInternalTransferPayload = createUsInternalTransferPayload(
          values,
          cash,
          userWallets,
          accType,
          wallet,
        );
        await usInternalbookTransfer(usInternalTransferPayload).unwrap();
        navigateToTransactionComplete();
      }
    } catch (error: any) {
      const errorMessage =
        'data' in error ? error.data.message : COMMON.somethingWentWrong;
      navigation.navigate(MAIN_NAVIGATOR.TransactionFailure, {
        error: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * navigateToTransactionComplete
   * - Navigates to the transaction completion screen
   */
  const navigateToTransactionComplete = () => {
    navigation.navigate(MAIN_NAVIGATOR.TransactionComplete, {
      isTrade: false,
      bankTransaction: false,
      cash: cash,
      avatar,
      krillTag,
      mobileNumber,
      accountHolder,
      type,
    });
  };

  const validationSchema = Yup.object({
    comments: Yup.string().required('Reason is required'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={COMMON.transferReview}
        style={styles.header}
        isBackButton
        isLeftTitle
        goBack={goBack}
      />
      {!bankTransaction && (
        <ScrollView style={{flex: 1}}>
          <View style={styles.cashContainer}>
            <Text style={[styles.lightText, {alignSelf: 'center'}]}>
              {COMMON.aboutToSend}
            </Text>
            <View style={styles.subContainer}>
              <Text style={styles.boldText}>
                {CARD_SYMBOL[wallet]}{' '}
                {cash ? parseFloat(cash).toFixed(2) : '0.00'}
              </Text>
              <View style={styles.flagContainer}>
                <Image style={styles.logo} source={PATHS[FLAG_TYPE[wallet]]} />
                <Text style={styles.boldText}>{SEND_MONEY_TYPE[wallet]}</Text>
              </View>
            </View>
          </View>
          <View style={styles.userContainer}>
            <View style={styles.mb20}>
              <Text style={[styles.lightText, styles.left]}>
                {COMMON.toKrillUser}
              </Text>
            </View>
            <Image
              style={styles.image}
              loadingIndicatorSource={PATHS.profilePic}
              source={
                avatar
                  ? {
                      uri: avatar,
                    }
                  : PATHS.profilePic
              }
            />
            <Image style={styles.flag} source={PATHS[WALLET_IMAGES[type]]} />
            <View style={styles.textContainer}>
              <Text style={styles.boldText}>{accountHolder}</Text>
              <Text style={[styles.lightText, styles.userText]}>
                {krillTag}
              </Text>
              <Text style={[styles.lightText, styles.userText]}>
                {mobileNumber}
              </Text>
            </View>
          </View>
          <Form
            initialValues={{comments: ''}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            <View style={{width: '85%', alignSelf: 'center', marginTop: 20}}>
              <FormSelect
                options={reasons}
                name="comments"
                placeholder={COMMON.reason}
              />
            </View>
            {/* {wallet == CARD_TYPE.NGN && (
              <View>
                {ngnChargeLoading ? (
                  <ActivityIndicator size={'small'} color={COLOR.primary} />
                ) : (
                  <>
                    {charge && (
                      <View style={styles.cashContainer}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={[styles.chargeText, {color: COLOR.red}]}>
                            Charges
                          </Text>
                          <Text style={[styles.chargeText, {color: COLOR.red}]}>
                            {charge}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 12,
                          }}>
                          <Text style={styles.amountTextTotal}>
                            Total Amount
                          </Text>
                          <Text style={styles.amountTextTotal}>
                            {totalAmount}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                )}
              </View>
            )} */}
            <View style={[styles.bottomContainer, {height: 170}]}>
              {/* <Text style={[styles.lightText, styles.left]}>
                {COMMON.reviewTransferText}
              </Text> */}
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  title={COMMON.sendMoney}
                  type={ButtonT.submit}
                />
              </View>
            </View>
          </Form>
        </ScrollView>
      )}
      {bankTransaction && (
        <ScrollView style={{flex: 1}}>
          <View style={styles.bankTransaction}>
            <Text style={styles.headingText}>{COMMON.fromAccount}</Text>
            <Papper style={styles.card}>
              <View style={styles.cardContainer}>
                <Text style={styles.headingText}>{COMMON.debitYour}</Text>
                <Text style={styles.text}>{WALLET_TEXT[wallet]}</Text>
              </View>
              <View style={styles.cardContainer}>
                <Text style={styles.headingText}>{COMMON.amount}</Text>
                <Text style={styles.text}>
                  {totalAmount} {SEND_MONEY_TYPE[wallet]}
                </Text>
              </View>
              <View style={styles.cardContainer}>
                <Text style={styles.headingText}>{COMMON.date}</Text>
                <Text style={styles.text}>
                  {moment(new Date()).format('MM/DD/YYYY')}
                </Text>
              </View>
            </Papper>
            <View style={styles.top}>
              <Text style={styles.headingText}>{COMMON.payee}</Text>
              <Papper style={styles.card}>
                <View style={styles.cardContainer}>
                  <Text style={styles.headingText}>{COMMON.accountHolder}</Text>
                  <Text style={styles.text}>{accountHolder}</Text>
                </View>
                <View style={styles.cardContainer}>
                  <Text style={styles.headingText}>{COMMON.bankName}</Text>
                  <Text style={styles.text}>{bankName}</Text>
                </View>
                <View style={styles.cardContainer}>
                  <Text style={styles.headingText}>{COMMON.accountNum}</Text>
                  <Text style={styles.text}>{accountNum}</Text>
                </View>
              </Papper>
            </View>
            <View style={styles.top}>
              <Text style={styles.headingText}>
                {COMMON.transactionDetails}
              </Text>
              <Papper style={styles.card}>
                <View style={styles.cardContainer}>
                  <Text style={styles.headingText}>{COMMON.sending}</Text>
                  <Text style={styles.text}>
                    {cash ? parseFloat(cash).toFixed(2) : '0.00'}{' '}
                    {SEND_MONEY_TYPE[wallet]}
                  </Text>
                </View>
                <View style={styles.cardContainer}>
                  <Text style={styles.headingText}>{COMMON.receiving}</Text>
                  <Text style={styles.text}>
                    {calculateAmount(cash, wallet)}
                    {CARD_TYPE.NGN}
                  </Text>
                </View>
                <View style={styles.cardContainer}>
                  <Text style={[styles.headingText]}>{COMMON.fee}</Text>
                  {charge && (
                    <Text style={[styles.text]}>
                      {wallet == CARD_TYPE.NGN
                        ? charge + ' ' + CARD_TYPE.NGN
                        : '0.00 USD'}
                    </Text>
                  )}
                </View>
                {wallet == CARD_TYPE.USDC && (
                  <View style={styles.cardContainer}>
                    <Text style={styles.headingText}>
                      {COMMON.exchangeRate}
                    </Text>
                    <Text style={styles.text}>1.00 USD = 1,588.00 NGN</Text>
                  </View>
                )}
              </Papper>
            </View>
            <View style={styles.bankContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => ExternalTransactionInitiation()}
                  style={charge == null ? styles.disabledButton : styles.button}
                  disabled={charge == null}>
                  <Text style={styles.whiteText}>{COMMON.sendMoney}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ReviewTransfer;
