import Header from '@kp/components/common/Header';
import {COMMON} from '@kp/constants/appText';
import {NavigationProp} from '@react-navigation/native';
import {Text, View} from 'react-native';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import {BOTTOM_TAB_NAVIGATOR} from '@kp/constants/routes';
import Button from '@kp/components/common/Button';

import LottieView from 'lottie-react-native';

interface Props {
  navigation: NavigationProp<any>;
  route: any;
}

/**
 * TransactionFailure Screen
 * - Displays a failure screen when a transaction is unsuccessful
 * - Shows an animation indicating failure
 * - Provides an error message explaining the failure
 * - Allows users to navigate back to the home screen
 */
const TransactionFailure = ({navigation, route}: Props) => {
  const {error} = route.params ?? {};

  console.log(error, 'ss');

  const goBack = () => {
    navigation.navigate(BOTTOM_TAB_NAVIGATOR.home);
  };

  /**
   * Handles retrying or closing the failure screen
   */
  const refetchAndClose = () => {
    navigation.navigate(BOTTOM_TAB_NAVIGATOR.home);
  };

  return (
    <View style={styles.container}>
      <Header
        title={COMMON.transactionFail}
        style={styles.header}
        goBack={goBack}
      />
      <LottieView
        source={PATHS.failureAnimation}
        autoPlay
        loop={false}
        style={styles.logo}
      />
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={styles.failureHeading}>Failure Error</Text>
        <Text style={styles.failureText}>{error}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={COMMON.close}
          onPress={refetchAndClose}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default TransactionFailure;
