import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfilePicture from '../ProfilePicture';
import PATHS from '@kp/constants/paths';
import {
  CARD_TYPE,
  CURRENCY_TYPE,
  WALLET_IMAGES,
  WALLET_TEXT,
} from '@kp/constants/appText';
import styles from './styles';
import {getWalletBalance, getWalletCash} from '@kp/utils/helper';
import {useAccountContext} from '@kp/context/accountType';
import COLOR from '@kp/constants/colors';
import {useAppSelector} from '@kp/redux/slices';
import {AccountType} from '@kp/constants/enum';

const WalletButton: React.FC<WalletButton> = ({
  type = '',
  onPress,
  style,
  showAmount,
  setTotalBalance,
}) => {
  const {accountType} = useAccountContext();
  const {walletBalances, balanceLoading, info} = useAppSelector(
    state => state.user,
  );
  const profileType = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';

  /**
   * Effect to reset the total balance when account type changes
   * - Sets total balance to 0.0 with an optional loading state
   */
  useEffect(() => {
    setTotalBalance?.(0.0, true);
  }, [accountType]);

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.4 : 1}
      onPress={onPress}
      style={style}>
      <View style={styles.container}>
        <ProfilePicture
          style={styles.pic}
          showFlag={false}
          source={PATHS[WALLET_IMAGES[type]]}
        />
        <View style={{marginLeft: 12}}>
          <Text style={styles.boldText}>{WALLET_TEXT[type]}</Text>
          <Text style={styles.text}>{CURRENCY_TYPE[type]}</Text>
        </View>
      </View>
      {showAmount && (
        <View style={styles.amountContainer}>
          {balanceLoading ? (
            <ActivityIndicator size={'small'} color={COLOR.primary} />
          ) : (
            <>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={[
                    styles.dollarSign,
                    type === CARD_TYPE.NGN && styles.ngnSign,
                  ]}
                  source={
                    type == CARD_TYPE.USDC ? PATHS[CARD_TYPE.USD] : PATHS[type]
                  }
                />
                {/* <Text>{type == CARD_TYPE.NGN ? CARD_TYPE.NGN : CARD_TYPE.USD}</Text> */}
                <Text
                  style={[
                    type == CARD_TYPE.NGN ? styles.text : styles.boldText,
                    styles.amount,
                  ]}>
                  {getWalletBalance(
                    walletBalances,
                    profileType as keyof WalletBalance,
                    type as
                      | keyof WalletBalance['ind']
                      | keyof WalletBalance['bus'],
                  )}
                </Text>
              </View>
              {type == CARD_TYPE.NGN && info.mobileCountry == 'US' && (
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.dollarSign}
                    source={PATHS[CARD_TYPE.USD]}
                  />
                  <Text style={[styles.boldText, styles.amount]}>
                    ~
                    {getWalletCash(
                      walletBalances,
                      profileType as keyof WalletBalance,
                      type as
                        | keyof WalletBalance['ind']
                        | keyof WalletBalance['bus'],
                    )}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default WalletButton;
