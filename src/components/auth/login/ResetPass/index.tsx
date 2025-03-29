import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import Form from '@kp/components/common/form/Form';
import PATHS from '@kp/constants/paths';
import {COMMON, FORGOT_PASSWORD_SCREEN} from '@kp/constants/appText';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import {createPasswordScheme} from '@kp/validations/auth';
import {ButtonT} from '@kp/constants/enum';
import Button from '@kp/components/common/Button';
import styles from '../ResetPass/styles';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import {ScreenProps} from '../../../../../@types/form';
import Header from '@kp/components/common/Header';
import LockIcon from '@kp/svgs/LockIcon';
import {post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import Papper from '@kp/components/common/Papper';
import {setMobileNumber} from '@kp/utils/login';
import {showToast} from '@kp/utils/common';

/**
 * Renders the reset password component.
 * - Receives navigation and route props with mobile number data.
 * - Manages error and loading states for password reset process.
 */
const ResetPass = ({navigation, route}: ScreenProps) => {
  const {val} = route.params ?? {};
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles submission of the password reset form.
   * - Validates password match and sends OTP to user's phone.
   * - Navigates to OTP screen on success or displays error on failure.
   */
  const handleSubmit = async (vals: any) => {
    showError && toggleError();
    if (vals.password == vals.confirmPassword) {
      const body = {mobileNumber: val};
      try {
        setIsLoading(true);
        const response = await post(URLS.sendOtpOnUserPhone, body);
        if (response) {
          setIsLoading(false);
          const body = {mobileNumber: val, password: vals.password};
          navigation.navigate(AUTH_NAVIGATOR.forgotOTP, {val: body});
        }
      } catch (e: any) {
        setIsLoading(false);
        toggleError();
        setError(e);
      }
    } else {
      setError('Password is not same');
      toggleError();
    }
  };

  /**
   * Toggles the visibility of the error message.
   * - Inverts the current showError state.
   */
  const toggleError = () => {
    setShowError(prev => !prev);
  };

  return (
    <View>
      <Header isBackButton title={FORGOT_PASSWORD_SCREEN.titleReset} />
      <Papper style={styles.card}>
        <Image style={styles.logo} source={PATHS.blueLogo} />
        <Text style={styles.title}>
          {FORGOT_PASSWORD_SCREEN.createNewPassword}
        </Text>
        <Form
          initialValues={{password: ''}}
          onSubmit={handleSubmit}
          validationSchema={createPasswordScheme}>
          <FormikTextInput
            Icon={LockIcon}
            name="password"
            placeholder={COMMON.newpassword}
            secureTextEntry
          />
          <FormikTextInput
            Icon={LockIcon}
            name="confirmPassword"
            placeholder={COMMON.confirmpassword}
            secureTextEntry
          />
          {showError && <Text style={styles.error}>{error}</Text>}
          <Button
            style={styles.mt30}
            title={COMMON.continue}
            type={ButtonT.submit}
            isLoading={isLoading}
          />
        </Form>
      </Papper>
    </View>
  );
};

export default ResetPass;
