import React, {useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import styles from './styles';
import Papper from '../Papper';
import {CARD_TYPE, COMMON} from '@kp/constants/appText';
import WalletButton from '../WalletButton';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';
import {useAppSelector} from '@kp/redux/slices';
import COLOR from '@kp/constants/colors';
import PATHS from '@kp/constants/paths';
import {getTotalBalance, getTotalBalanceNGN} from '@kp/utils/helper';

/**
 * SelectWallet Component
 * - Displays a list of user wallets with their respective balances
 * - Shows total balance in USD or NGN based on user location
 * - Allows selecting a wallet, filtered by allowed transaction types
 * - Supports showing/hiding wallet balances
 */
const SelectWallet: React.FC<Wallet> = ({
  type,
  changeWallet,
  style,
  showAmount = false,
  isTrade = false,
  notAllowedWallet = [],
}) => {
  const {
    userWallets,
    walletBalances,
    balanceLoading,
    info,
    transactionControl,
  } = useAppSelector(state => state.user);
  const {accountType} = useAccountContext();

  const isUsUser = info.mobileCountry == 'US';

  const accType = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';
  return (
    <View style={[style, styles.main]}>
      <Papper style={styles.card}>
        {showAmount && (
          <View style={styles.showAmount}>
            <Text style={styles.text}>
              {isUsUser ? COMMON.BalanceUSD : COMMON.BalanceNGN}
            </Text>
            {balanceLoading ? (
              <ActivityIndicator size={'small'} color={COLOR.primary} />
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.dollarSign}
                  source={
                    isUsUser ? PATHS[CARD_TYPE.USD] : PATHS[CARD_TYPE.NGN]
                  }
                />
                <Text style={[styles.text, {marginLeft: 1}]}>
                  {isUsUser
                    ? getTotalBalance(walletBalances, accType)
                    : getTotalBalanceNGN(walletBalances, accType)}
                </Text>
              </View>
            )}
          </View>
        )}
      </Papper>
      <View style={!showAmount && styles.container}>
        {userWallets[accType]?.map((item: any) => {
          // Check if the wallet's currency is in the notAllowedWallet list
          if (notAllowedWallet.includes(item.walletCurrency)) {
            return null; // Skip this wallet
          }
          const isAllowed =
            transactionControl[accType][
              item.walletCurrency as keyof TransactionControl[keyof TransactionControl]
            ];

          if (!isAllowed) {
            return null;
          }

          if (item.walletCurrency == CARD_TYPE.NGN && !item.partnerBankId) {
            return null;
          }

          return (
            <WalletButton
              key={item.id}
              type={item.walletCurrency}
              onPress={() => changeWallet?.(item.walletCurrency, item.id)}
              style={[styles.walletButton, showAmount && styles.walletHeight]}
              showAmount={showAmount}
              id={item.id}
            />
          );
        })}
      </View>
    </View>
  );
};

export default SelectWallet;
