import Header from '@kp/components/common/Header';
import {
  CARD_TYPE,
  COMMON,
  MONEY_WALLETS,
  SEND_MONEY_TYPE,
  WALLET_IMAGES,
} from '@kp/constants/appText';
import {NavigationProp} from '@react-navigation/native';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import {BOTTOM_TAB_NAVIGATOR} from '@kp/constants/routes';
import ProfilePicture from '@kp/components/common/ProfilePicture';
import {useWalletContext} from '@kp/context/walletType';
import Button from '@kp/components/common/Button';
import {
  useGetWalletBalanceQuery,
  useGetWalletTransactionQuery,
} from '@kp/redux/service/transaction';
import {useAppSelector} from '@kp/redux/slices';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';
import {homeScreen} from '@kp/constants';
import {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';

interface Props {
  navigation: NavigationProp<any>;
  route: any;
}

/**
 * TransactionComplete
 * - Displays the transaction completion screen
 * - Shows different UI based on transaction type (trade, bank transaction, wallet transfer)
 * - Uses animations to enhance user experience
 * - Fetches wallet balance and transaction history
 */
const TransactionComplete = ({navigation, route}: Props) => {
  const {userWallets} = useAppSelector(state => state.user);
  const {accountType} = useAccountContext();
  const selectedAccType = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';

  /**
   * Find the user's wallet ID based on selected account type
   */
  const index = userWallets[selectedAccType]?.findIndex(
    (eachWallet: any) => eachWallet.walletCurrency === wallet,
  );
  const [walletId, setWalletId] = useState(
    userWallets?.[selectedAccType]?.[index ? index : 0]?.id,
  );

  /**
   * Fetch wallet balance and transaction history
   */
  const {
    data: balanceData,
    error,
    refetch: refetchBalance,
  } = useGetWalletBalanceQuery(walletId);
  const {data: transactionHistory, refetch: refetchTransactions} =
    useGetWalletTransactionQuery({
      id: walletId,
      per_page: homeScreen.transactionSize,
    });

  const {
    sell,
    buy,
    Fee,
    isTrade,
    bankTransaction,
    cash,
    accountHolder,
    accountNum,
    bankName,
    type,
    avatar,
    krillTag,
    mobileNumber,
  } = route.params ?? {};
  const {wallet} = useWalletContext();

  /**
   * Determine the correct flag images based on wallet type
   */
  const buyFlag =
    wallet == CARD_TYPE.USD ? WALLET_IMAGES.USD : WALLET_IMAGES.USDC;
  const sellFlag =
    wallet == CARD_TYPE.USD ? WALLET_IMAGES.USDC : WALLET_IMAGES.USD;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title={COMMON.transactionComplete}
        style={styles.header}
        goBack={goBack}
      />
      <LottieView
        source={PATHS.successAnimation}
        autoPlay
        loop={false}
        style={styles.logo}
      />
      {/* <Image style={styles.logo} source={PATHS.completed} /> */}
      <Text style={[styles.text, bankTransaction && styles.bankText]}>
        {bankTransaction
          ? COMMON.bankSuccess
          : isTrade
          ? COMMON.trade
          : COMMON.successTransaction}
      </Text>
      {!isTrade && !bankTransaction && (
        <>
          <View style={styles.userContainer}>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={avatar ? {uri: avatar} : PATHS.profilePic}
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
          <Text style={[styles.text, styles.cash]}>
            {cash ? parseFloat(cash).toFixed(2) : '0.00'}{' '}
            {SEND_MONEY_TYPE[wallet]}
          </Text>
        </>
      )}
      {isTrade && (
        <View style={styles.top}>
          <View style={styles.tradeContainer}>
            <Text style={styles.tradeText}>{COMMON.sell}:</Text>
            <Text style={styles.tradeText}>
              {sell} {wallet == CARD_TYPE.USD ? CARD_TYPE.USD : COMMON.digital}
            </Text>
          </View>
          <View style={styles.tradeContainer}>
            <Text style={styles.tradeText}>{COMMON.buy}:</Text>
            <Text style={styles.tradeText}>
              {buy} {wallet == CARD_TYPE.USD ? COMMON.digital : CARD_TYPE.USD}
            </Text>
          </View>
          <View style={styles.transferContainer}>
            <Image style={styles.flagIcon} source={PATHS[buyFlag]} />
            <Image style={styles.arrowIcon} source={PATHS.arrow} />
            <Image style={styles.flagIcon} source={PATHS[sellFlag]} />
          </View>
          <Text style={styles.conversionText}>{COMMON.conversionRate}</Text>
          <View style={styles.conversionContainer}>
            <Text style={styles.feeText}>{COMMON.conversionFee}</Text>
            <Text style={[styles.feeText, styles.left]}>{Fee}</Text>
          </View>
        </View>
      )}
      {bankTransaction && (
        <View style={{marginTop: 20}}>
          <ProfilePicture
            showFlag={true}
            type={wallet}
            source={PATHS.bank}
            style={styles.bankLogo}
          />
          <Text style={styles.bankText}>{accountHolder}</Text>
          <Text style={styles.textBankLight}>{bankName}</Text>
          <Text style={styles.textBankLight}>{accountNum}</Text>
          {wallet == CARD_TYPE.USDC && (
            <>
              <View style={styles.transferContainer}>
                <Image
                  style={styles.flagIcon}
                  source={PATHS[MONEY_WALLETS[wallet]]}
                />
                <Image style={styles.arrowIcon} source={PATHS.arrow} />
                <Image
                  style={styles.flagIcon}
                  source={PATHS[WALLET_IMAGES.NGN]}
                />
              </View>
              <Text style={styles.amountText}>
                {parseFloat(cash).toFixed(2)} USD ~{' '}
                {(parseFloat(cash) * 1588).toFixed(2)} NGN
              </Text>
            </>
          )}
          {wallet == CARD_TYPE.NGN && (
            <View style={styles.NGNText}>
              <Text style={styles.textNGN}>
                {parseFloat(cash).toFixed(2)} {CARD_TYPE.NGN}
              </Text>
            </View>
          )}
          {wallet == CARD_TYPE.USD && (
            <View style={styles.NGNText}>
              <Text style={styles.textNGN}>
                {parseFloat(cash).toFixed(2)} {CARD_TYPE.USD}
              </Text>
            </View>
          )}
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={COMMON.close}
          onPress={() => navigation.navigate(BOTTOM_TAB_NAVIGATOR.home)}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default TransactionComplete;
