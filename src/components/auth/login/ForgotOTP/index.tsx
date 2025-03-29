import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FORGOT_PASSWORD_SCREEN} from '@kp/constants/appText';
import Header from '@kp/components/common/Header';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import SignupForm from '@kp/components/auth/signup/SignupForm';
import MobileWithNum from '@kp/svgs/MobileWithNum';
import {ScreenProps} from '../../../../../@types/form';
import styles from './style';
import useTimer from '@kp/hooks/useTimer';
import {FieldType} from '@kp/constants/enum';
import {otpSchema} from '@kp/validations/auth';
import {post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import {setMobileNumber} from '@kp/utils/login';
import {showToast} from '@kp/utils/common';

/**
 * Renders the OTP verification screen.
 * - Receives navigation and route props for screen functionality.
 * - Manages OTP input and verification process.
 */
const VerifyOTP = ({navigation, route}: ScreenProps) => {
  const {val} = route.params;
  const {start, timeLeft} = useTimer(60);
  const [isLoading, setIsLoading] = useState(false);
  const [resendButton, setResendButton] = useState(false);

  /**
   * Resends an OTP by making an API call to verify a phone number.
   * - Logs the current value for debugging.
   * - Sends a POST request with the mobile number.
   * - Updates UI state and starts a timer on success, or shows an error alert on failure.
   */
  const resendOtp = async () => {
    console.log(val, 'sss');
    try {
      const response = await post(URLS.verifyPhone, {
        mobileNumber: val.mobileNumber,
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

  /**
   * Handles form submission to reset a password using an OTP.
   * - Sets loading state and prepares request body with mobile number, password, and OTP.
   * - Sends a POST request to the forgot password endpoint.
   * - Updates UI and navigates to login screen on success, or shows an error on failure.
   */
  const handleSubmit = async (vals: any) => {
    try {
      setIsLoading(true);
      const body = {
        mobileNumber: val.mobileNumber,
        password: val.password,
        otp: vals.otp,
      };
      const response = await post(URLS.forgotPassword, body);
      if (response) {
        setIsLoading(false);
        showToast('Password has been updated!');
        // If OTP is already submitted, navigate to home screen
        navigation.replace(AUTH_NAVIGATOR.login, {navigation: navigation});
      }
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert(error ? error : 'Something Went Wrong!');
    }
  };

  /**
   * Updates the resend button state based on a timer.
   * - Checks if the time left reaches zero.
   * - Enables the resend button when the timer expires.
   */
  useEffect(() => {
    if (timeLeft == 0) {
      setResendButton(true);
    }
  }, [timeLeft]);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <Header isBackButton title={FORGOT_PASSWORD_SCREEN.enterOtp} />
      <SignupForm
        onSubmit={handleSubmit}
        Icon={MobileWithNum}
        fields={[{name: 'otp', label: 'OTP', type: FieldType.otp}]}
        validationSchema={otpSchema}
        shouldLoad={isLoading}
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
          <TouchableOpacity onPress={resendOtp} style={styles.mt40}>
            <Text style={styles.resendTextBold}>Resend</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default VerifyOTP;
