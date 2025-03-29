import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import styles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CARD_SYMBOL, CARD_TYPE, COMMON} from '@kp/constants/appText';
import ProfilePicture from '@kp/components/common/ProfilePicture';
import COLOR from '@kp/constants/colors';
import {useNavigation} from '@react-navigation/native';
import PATHS from '@kp/constants/paths';
import {DRAWER_NAVIGATOR} from '@kp/constants/routes';
import {
  getTransactionText,
  shouldShowRed,
  shouldShowRedTransfer,
} from '@kp/utils/transaction';
import {homeScreen} from '@kp/constants';
import {
  convertUTCToLocalTime,
  getName,
  getStatusColor,
  getStatusMessage,
  getWalletTransaction,
  removeCommas,
  truncateWithEllipsis,
} from '@kp/utils/helper';
import {useGetWalletTransactionQuery} from '@kp/redux/service/transaction';
import {useWalletContext} from '@kp/context/walletType';
import {AccountType} from '@kp/constants/enum';
import {useAccountContext} from '@kp/context/accountType';
import {useAppSelector} from '@kp/redux/slices';

/**
 * TransactionHistory Component
 * - Displays a list of recent transactions
 * - Supports biometric authentication checks
 * - Integrates with Redux state and user context
 * - Handles loading state and empty transactions
 */
const TransactionHistory: React.FC<TransactionHistory> = ({
  type,
  isActiveWallet,
}) => {
  const navigation = useNavigation<any>();
  const {wallet} = useWalletContext();
  const {accountType} = useAccountContext();
  const {individualProfile, businessProfile} = useAppSelector(
    (state: any) => state.user,
  );
  const {walletTransactions, transactionsLoading} = useAppSelector(
    state => state.user,
  );
  const [transactions, setTransactions] = useState();

  /**
   * Effect: Fetch transactions based on wallet and account type
   * - Determines if the profile is individual or business
   * - Filters transactions accordingly
   */
  useEffect(() => {
    if (wallet) {
      const profileType = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';
      setTransactions(
        getWalletTransaction(walletTransactions, profileType, wallet),
      );
    }
  }, [wallet, transactionsLoading, walletTransactions]);

  const profile =
    accountType == AccountType.INDIVIDUAL ? individualProfile : businessProfile;

  /**
   * Render function for a single transaction item
   * - Displays profile picture, transaction details, and amount
   * - Handles different transaction types including bank transactions
   */
  const renderItem = ({item}: any) => {
    const showRed = item.side
      ? shouldShowRedTransfer(item.side, wallet)
      : shouldShowRed(item.drCr);
    const isBankTransaction =
      item.transactionType == 'Cash Out' ||
      item.transactionType == 'Money Added';
    const source = item?.avatar
      ? {uri: item?.avatar}
      : isBankTransaction
      ? PATHS.bank
      : PATHS.profilePic;
    const name = item.name && getName(item.name);
    const dateTime = item.dateTime && convertUTCToLocalTime(item.dateTime);
    return (
      <View id={item.id} style={styles.transactionItems}>
        {item.symbol ? (
          <ProfilePicture
            style={styles.profile}
            showFlag={true}
            type={wallet}
            source={{uri: profile.avatar}}
          />
        ) : (
          <ProfilePicture
            style={styles.profile}
            showFlag={true}
            type={item.currency}
            source={source}
          />
        )}
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.textHeading}>
                {item.side
                  ? getTransactionText(item.side, wallet, item.transactionType)
                  : item.transactionType}
              </Text>
              {/* <View
                style={[
                  styles.statusContainer,
                  {backgroundColor: getStatusColor(item.status)},
                ]}> */}
              <Text
                style={[
                  styles.statusText,
                  {color: getStatusColor(item.status)},
                ]}>
                {getStatusMessage(item.status)}
              </Text>
              {/* </View> */}
            </View>
            <Text
              style={[
                styles.amountText,
                {
                  color: showRed ? COLOR.danger : COLOR.primary,
                },
              ]}>
              {item.currency == CARD_TYPE.NGN
                ? CARD_SYMBOL.NGN
                : CARD_SYMBOL.USD}{' '}
              {item.amount}
            </Text>
          </View>
          {item.phoneNumber !== '' && (
            <Text style={styles.textContent}>
              {name} | {item?.phoneNumber}
            </Text>
          )}
          {item.phoneNumber == '' && (
            <Text style={styles.textContent}>
              {truncateWithEllipsis(item.name, 28)}
            </Text>
          )}
          <Text style={styles.textContent}>{dateTime}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.transactionText}>{COMMON.transactionActivity}</Text>
        {transactions && (transactions as any).length > 0 && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(DRAWER_NAVIGATOR.TransactionHistory)
            }>
            <Text style={styles.viewMoreText}>{COMMON.viewMore}</Text>
          </TouchableOpacity>
        )}
      </View>
      {transactionsLoading ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: 120}}
          color={COLOR.primary}
        />
      ) : (
        <View style={styles.transactionList}>
          {isActiveWallet && (
            <>
              {transactions && (transactions as any).length > 0 ? (
                <FlatList
                  contentContainerStyle={styles.flatlistContainer}
                  id={type}
                  data={transactions}
                  renderItem={renderItem}
                  scrollEnabled
                  keyExtractor={(_: any, index) => index.toString()}
                />
              ) : (
                walletTransactions !== undefined && (
                  <Text
                    style={{
                      marginHorizontal: 12,
                      marginTop: 14,
                      letterSpacing: 0.5,
                      color: COLOR.black,
                    }}>
                    Looks like you haven't made any transactions yet. Let's get
                    started!
                  </Text>
                )
              )}
            </>
          )}
          {!isActiveWallet && (
            <Text style={styles.text}>
              {wallet == CARD_TYPE.NGN
                ? COMMON.unverifiedNGNText
                : wallet == CARD_TYPE.USDC
                ? COMMON.unverifiedUSDCText
                : COMMON.unverifiedTranscationHistory}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default TransactionHistory;
