import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '@kp/components/common/Header';
import {COMMON} from '@kp/constants/appText';
import SelectWallet from '@kp/components/common/SelectWallet';
import styles from './styles';

/**
 * WalletScreen Component
 * - Displays the user's wallet with available balances
 * - Includes a header and a selectable wallet list
 */
const WalletScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={COMMON.wallets} style={styles.header} />
      <SelectWallet showAmount={true} />
    </SafeAreaView>
  );
};

export default WalletScreen;
