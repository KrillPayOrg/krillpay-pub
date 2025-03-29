import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {COMMON} from '@kp/constants/appText';
import Header from '@kp/components/common/Header';
import LoginForm from '@kp/components/auth/login/LoginForm';
import {ScreenProps} from '../../../@types/form';

/**
 * EnableBioLoginScreen
 * - Displays the login screen with biometric authentication enabled
 * - Includes a header and the login form component
 */
const EnableBioLoginScreen = ({navigation}: ScreenProps) => {
  return (
    <View style={styles.container}>
      <Header isBackButton title={COMMON.krillPay} />
      <LoginForm isBio />
    </View>
  );
};

export default EnableBioLoginScreen;
