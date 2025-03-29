import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

import {NavigationProp} from '@react-navigation/native';
import Header from '@kp/components/common/Header';
import {COMMON} from '@kp/constants/appText';
import Papper from '@kp/components/common/Papper';
import {useAppSelector} from '@kp/redux/slices';

interface Props {
  navigation: NavigationProp<any>;
}

/**
 * DepositCashScreen Component
 * - Displays user's deposit details, including bank and account information
 * - Provides an option to confirm a deposit action
 * - Integrates with Redux to fetch user wallet details
 */
const DepositCashScreen = ({navigation}: Props) => {
  const {userWallets} = useAppSelector(state => state.user);
  const {
    partnerWalletName,
    partnerWalletId,
    profileType,
    walletCurrency,
    platformDetails,
  }: any =
    userWallets.ind !== null && userWallets.ind[userWallets.ind?.length - 1];

  /**
   * goBack
   * - Navigates back to the previous screen
   */
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={COMMON.Deposit}
        style={styles.header}
        isBackButton
        isLeftTitle
        goBack={goBack}
      />
      <Papper style={styles.card} />
      <Text style={styles.depositText}>{COMMON.DepositText}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.margin}>
          <View style={styles.textView}>
            <Text style={styles.depositText}>{COMMON.bankName}</Text>
            <Text style={[styles.depositText, styles.boldText]}>
              NOMBA Bank
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.depositText}>{COMMON.accountNum}</Text>
            <Text style={[styles.depositText, styles.boldText]}>
              {partnerWalletId}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.depositText}>{COMMON.accountName}</Text>
            <Text style={[styles.depositText, styles.boldText]}>
              {partnerWalletName}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.depositText}>{COMMON.accountType}</Text>
            <Text style={[styles.depositText, styles.boldText]}>
              {profileType === 'IND' ? 'Individual' : profileType}
            </Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.depositText}>{COMMON.accountCurrency}</Text>
            <Text style={[styles.depositText, styles.boldText]}>
              {walletCurrency}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          <Text style={styles.whiteText}>{COMMON.madeDeposit}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DepositCashScreen;
