import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import {SIGNUP_SCREEN} from '@kp/constants/appText';
import Header from '@kp/components/common/Header';
import BottomContainer from '@kp/components/auth/BottomContainer';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import SignupForm from '@kp/components/auth/signup/SignupForm';
import MobileWithNum from '@kp/svgs/MobileWithNum';

import {ScreenProps} from '../../../@types/form';

import styles from './styles';
import useTimer from '@kp/hooks/useTimer';
import {otpSchema} from '@kp/validations/auth';
import {post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import {AccountType, KP_SY_PARAM_USER_TYPE} from '@kp/constants/enum';

const {height} = Dimensions.get('screen');

/**
 * VerifyAuthOTPScreen
 * - Screen for verifying OTP during authentication
 * - Handles OTP submission and resend functionality
 * - Navigates to appropriate signup flow based on user country
 */
const VerifyAuthOTPScreen = ({navigation, route}: ScreenProps) => {
  const {start, timeLeft} = useTimer(30);
  const [resendButton, setResendButton] = useState(false);
  const value = route.params;

  /**
   * handleSubmit
   * - Submits the OTP for verification
   * - Navigates user to next step based on response
   * - Displays error messages in case of failure
   */
  const handleSubmit = async (
    vals: any,
    setShowError: any,
    setIsLoading: any,
    setError: any,
  ) => {
    try {
      setIsLoading(true);
      setShowError(false);
      const body = {mobileNumber: value.mobileNumber, ...vals};
      const response = await post(URLS.verifyOtp, body);
      if (response) {
        const newValue = {
          ...value,
          userType: KP_SY_PARAM_USER_TYPE.INDIVIDUAL,
        };
        setIsLoading(false);
        value.mobileCountry == 'US'
          ? navigation.navigate(AUTH_NAVIGATOR.signupType, {...value})
          : navigation.navigate(AUTH_NAVIGATOR.accountDetails, {
              val: newValue,
              type: AccountType.INDIVIDUAL,
            });
      }
    } catch (error) {
      setIsLoading(false);
      setShowError(true);
      setError(
        `Error: ${
          error == 'pending' ? 'Invalid OTP' : error || 'Server Failure'
        }`,
      );
    }
  };

  /**
   * resendOtp
   * - Sends a request to resend OTP
   * - Restarts the countdown timer on success
   * - Displays an alert in case of failure
   */
  const resendOtp = async () => {
    try {
      const response = await post(URLS.verifyPhone, {
        mobileNumber: value.mobileNumber,
      });
      if (response) {
        setResendButton(false);
        start();
      }
    } catch (error) {
      Alert.alert(`${error ? error : 'Something Went Wrong!'}`);
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    if (timeLeft == 0) {
      setResendButton(true);
    }
  }, [timeLeft]);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.container}>
        <Header title={SIGNUP_SCREEN.verifyPhone} isBackButton />
        <SignupForm
          onSubmit={handleSubmit}
          Icon={MobileWithNum}
          fields={[{name: 'otp', label: 'OTP', type: 'otp'}]}
          validationSchema={otpSchema}
          resendButton={resendButton}
          setResendButton={setResendButton}
        />
        {timeLeft > 0 && (
          <View style={styles.timer}>
            <Text style={styles.timerText}>
              Resend code in 00:{timeLeft > 9 ? timeLeft : `0${timeLeft}`}
            </Text>
          </View>
        )}
        {resendButton && (
          <View style={[styles.timer, {flexDirection: 'row'}]}>
            <Text style={[styles.mt40, styles.resendText]}>
              I didn't receive the code.{' '}
            </Text>
            <Text
              onPress={resendOtp}
              style={[styles.mt40, styles.resendTextBold]}>
              Resend
            </Text>
          </View>
        )}
        {/* <BottomContainer
          style={{marginTop: height * 0.55}}
          title={SIGNUP_SCREEN.alreadyHaveAccount}
          btnText={SIGNUP_SCREEN.loginHere}
          onPress={() => navigation.navigate(AUTH_NAVIGATOR.login)}
        /> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyAuthOTPScreen;
