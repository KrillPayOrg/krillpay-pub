import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import {CARD_TYPE, COMMON} from '@kp/constants/appText';
import Card from '@kp/components/common/Card';
import TabButton from '@kp/components/common/TabButton';
import {AccountType} from '@kp/constants/enum';
import {useAccountContext} from '@kp/context/accountType';
import {useNavigation} from '@react-navigation/native';
import {DRAWER_NAVIGATOR, MAIN_NAVIGATOR} from '@kp/constants/routes';
import ComingSoonModal from '../../Modal/ComingSoon';
import PopUp from '../../Modal';
import {useGetKycStatusQuery} from '@kp/redux/service/users';
import {setIsFirstTime, setUserKycStatus} from '@kp/redux/slices/userSlice';
import {useAppDispatch, useAppSelector} from '@kp/redux/slices';
import {checkKycStatus, isUserRejected, isUserVerified} from '@kp/utils/common';
import {get} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import InProcessKYC from '../../Modal/InProcessKyc';

/**
 * CardContainer Component
 * - Displays a card with wallet details and associated actions
 * - Manages KYC verification status and modal pop-ups
 * - Provides functionalities for sending, adding, exchanging, and receiving money
 */
const CardContainer: React.FC<ButtonContainer> = ({
  buttonWidth,
  type,
  isActiveWallet,
  walletId,
  originalId,
  updateWallets,
  refetchWallet,
  haveAccount,
  activeIndex,
  totalLength,
}) => {
  const {transactionControl, balanceLoading, isFirstTime} = useAppSelector(
    state => state.user,
  );
  const {
    data: kycStatusData,
    isLoading: kycLoading,
    isError: isKycError,
    refetch: KycRefetch,
  } = useGetKycStatusQuery(null);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showVerificationModalInProgress, setShowVerificationModalInProgress] =
    useState(false);
  const {accountType} = useAccountContext();

  const status = kycStatusData
    ? accountType == AccountType.INDIVIDUAL
      ? kycStatusData.individualDetails?.kycStatus
      : kycStatusData.businessDetails?.kybStatus
    : 'UNV';

  /**
   * Toggles the visibility of the modal
   */
  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  /**
   * Handles KYC status updates and triggers modals based on user verification status
   */
  useEffect(() => {
    if (!kycLoading && kycStatusData) {
      dispatch(setUserKycStatus(kycStatusData));
      const status = kycStatusData
        ? accountType == AccountType.INDIVIDUAL
          ? kycStatusData.individualDetails?.kycStatus
          : kycStatusData.businessDetails?.kybStatus
        : 'UNV';
      if (status === 'UNV' && isFirstTime) {
        toggleVerificationModal();
      }
    }
  }, [kycStatusData, kycLoading, accountType, isFirstTime]);

  /**
   * Toggles the verification modal visibility
   */
  const toggleVerificationModal = () => {
    dispatch(setIsFirstTime(false));
    setShowVerificationModal(prev => !prev);
  };

  /**
   * Toggles the verification in-progress modal visibility
   */
  const toggleVerificationModalInProgress = () => {
    setShowVerificationModalInProgress(prev => !prev);
  };

  const navigation = useNavigation<any>();

  /**
   * Handles exchanging money, checking KYC and wallet status
   */
  const exchangeMoney = async () => {
    if (!balanceLoading && !kycLoading) {
      const statusVerified = isUserVerified(status);
      if (statusVerified && isActiveWallet && haveAccount) {
        navigation.navigate(MAIN_NAVIGATOR.Exchange);
      } else if (status == 'UNV') {
        toggleVerificationModal();
      } else {
        toggleVerificationModalInProgress();
      }
    }
  };

  /**
   * Handles sending money, checking KYC and wallet status
   */
  const sendMoney = async () => {
    if (!balanceLoading && !kycLoading) {
      const statusVerified = isUserVerified(status);
      if (statusVerified && isActiveWallet && haveAccount) {
        navigation.navigate(MAIN_NAVIGATOR.SendMoney, {id: walletId});
      } else if (status == 'UNV') {
        toggleVerificationModal();
      } else {
        toggleVerificationModalInProgress();
      }
    }
  };

  /**
   * Handles adding money, checking KYC and wallet status
   */
  const addMoney = async () => {
    if (!balanceLoading && !kycLoading) {
      const statusVerified = isUserVerified(status);
      if (
        type == CARD_TYPE.NGN &&
        isActiveWallet &&
        statusVerified &&
        haveAccount
      ) {
        navigation.navigate('Deposit');
      } else {
        if (statusVerified && isActiveWallet && haveAccount) {
          navigation.navigate(MAIN_NAVIGATOR.PlaidView, {type: 'addMoney'});
        } else if (status == 'UNV') {
          toggleVerificationModal();
        } else {
          toggleVerificationModalInProgress();
        }
      }
    }
  };

  /**
   * Handles cash-out transactions, checking KYC and wallet status
   */
  const cashOut = async () => {
    if (!balanceLoading && !kycLoading) {
      const statusVerified = isUserVerified(status);
      if (statusVerified && isActiveWallet && haveAccount) {
        navigation.navigate(MAIN_NAVIGATOR.PlaidView, {type: 'cashOut'});
      } else if (status == 'UNV') {
        toggleVerificationModal();
      } else {
        toggleVerificationModalInProgress();
      }
    }
  };

  /**
   * Handles receiving money via QR code, checking KYC and wallet status
   */
  const receive = async () => {
    if (!balanceLoading && !kycLoading) {
      const statusVerified = isUserVerified(status);
      if (statusVerified && isActiveWallet && haveAccount) {
        navigation.navigate(DRAWER_NAVIGATOR.QRCode);
      } else if (status == 'UNV') {
        toggleVerificationModal();
      } else {
        toggleVerificationModalInProgress();
      }
    }
  };

  const accountT: keyof TransactionControl =
    accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';

  return (
    <View style={styles.container}>
      <ComingSoonModal modalVisible={showModal} toggleModal={toggleModal} />
      <PopUp
        modalVisible={showVerificationModal}
        toggleModal={toggleVerificationModal}
        isVerificationModal
      />
      <InProcessKYC
        text={
          type == CARD_TYPE.NGN && isUserVerified(status) && haveAccount
            ? COMMON.bvnVerifyText
            : type == CARD_TYPE.NGN && !haveAccount
            ? COMMON.ngnAccountInProgress
            : isUserRejected(status)
            ? COMMON.identityVerificationTextRejected
            : COMMON.identityVerificationTextProcess
        }
        modalVisible={showVerificationModalInProgress}
        toggleModal={toggleVerificationModalInProgress}
      />
      <Card
        type={type}
        walletId={walletId}
        style={styles.alignSelf}
        activeIndex={activeIndex}
        totalLength={totalLength}
        refetchWallet={refetchWallet}
        isActiveWallet={isActiveWallet}
        originalId={originalId}
        updateWallets={updateWallets}
      />
      <View
        style={[
          styles.buttonContainer,
          {
            width: '100%',
            paddingHorizontal: 5,
            justifyContent: 'flex-start',
          },
        ]}>
        <TabButton
          title={COMMON.sendMoney}
          style={[styles.button, styles.sendColor]}
          onPress={sendMoney}
          width={buttonWidth}
          image={PATHS.sendButton}
        />
        {accountT == 'ind' &&
          type !== CARD_TYPE.NGN &&
          transactionControl[accountT].USD &&
          transactionControl[accountT].USDC && (
            <TabButton
              title={COMMON.exchange}
              style={[styles.button, styles.exchangeColor]}
              onPress={exchangeMoney}
              width={buttonWidth}
              image={PATHS.exchangeMoney}
            />
          )}
        {type !== CARD_TYPE.USDC && (
          <TabButton
            title={COMMON.addMoney}
            style={[styles.button, styles.addMoney]}
            onPress={addMoney}
            width={buttonWidth}
            image={PATHS.addMoney}
          />
        )}
        {type == CARD_TYPE.USD && (
          <TabButton
            title={COMMON.cashhout}
            style={[styles.button, styles.cashOut]}
            onPress={cashOut}
            width={buttonWidth}
            image={PATHS.cashOut}
          />
        )}
        {accountType == AccountType.BUSINESS && (
          <TabButton
            title={COMMON.receive}
            style={[styles.button, styles.receive]}
            onPress={receive}
            width={buttonWidth}
            image={PATHS.receive}
          />
        )}
      </View>
    </View>
  );
};

export default CardContainer;
