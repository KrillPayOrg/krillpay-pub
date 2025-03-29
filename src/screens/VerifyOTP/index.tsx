import React, {useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, Text, View} from 'react-native';
import {CREATE_PIN_SCREEN, FORGOT_PASSWORD_SCREEN} from '@kp/constants/appText';
import Header from '@kp/components/common/Header';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import SignupForm from '@kp/components/auth/signup/SignupForm';
import MobileWithNum from '@kp/svgs/MobileWithNum';
import {ScreenProps} from '../../../@types/form';
import styles from './style';
import useTimer from '@kp/hooks/useTimer';
import {FieldType} from '@kp/constants/enum';
import {otpSchema} from '@kp/validations/auth';
import {post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import {useAppSelector} from '@kp/redux/slices';

const VerifyOTP = ({navigation, route}: ScreenProps) => {
  const {start, timeLeft} = useTimer(60);
  const {info} = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [resendButton, setResendButton] = useState(false);

  /**
   * resendOtp
   * - Sends a request to resend the OTP to the user's mobile number
   * - Starts the timer after successful request
   * - Displays an alert in case of an error
   */
  const resendOtp = async () => {
    try {
      const response = await post(URLS.sendOtpOnUserPhone, {
        mobileNumber: info.mobileNumber,
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
   * handleSubmit
   * - Handles OTP submission for verification
   * - Sends a request to verify the OTP
   * - Navigates to ResetPin screen if successful
   * - Displays an alert in case of an error
   */
  const handleSubmit = async (vals: any) => {
    try {
      setIsLoading(true);
      const body = {mobileNumber: info.mobileNumber, otp: vals.otp};
      const response = await post(URLS.verifyOtp, body);
      if (response) {
        setIsLoading(false);
        navigation.navigate(MAIN_NAVIGATOR.ResetPin, {
          title: CREATE_PIN_SCREEN.createPin,
          body: CREATE_PIN_SCREEN.desc,
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert(error ? error : 'Something Went Wrong');
    }
  };

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
          <Text
            onPress={resendOtp}
            style={[styles.mt40, styles.resendTextBold]}>
            Resend
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default VerifyOTP;
