import React, {useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import Papper from '@kp/components/common/Papper';
import Form from '@kp/components/common/form/Form';
import PATHS from '@kp/constants/paths';
import {COMMON, FORGOT_PASSWORD_SCREEN} from '@kp/constants/appText';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import {phoneSchema} from '@kp/validations/auth';
import {ButtonT, FieldType} from '@kp/constants/enum';
import Button from '@kp/components/common/Button';
import styles from './styles';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import {ScreenProps} from '../../../../../@types/form';
import Header from '@kp/components/common/Header';
import {setMobileNumber} from '@kp/utils/login';
import {post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';

/**
 * Renders the forgot password screen.
 * - Manages loading state for form submission.
 * - Processes mobile number input and navigates to reset password screen.
 */
const ForgotPassword = ({navigation}: ScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles submission of the forgot password form.
   * - Sets loading state and formats the mobile number.
   * - Sends request and navigates to reset password screen on success.
   * - Shows error alert if submission fails.
   */
  const handleSubmit = async (val: any) => {
    setIsLoading(true);
    const phoneNum = setMobileNumber(val.mobileCountry, val.mobileNumber);
    try {
      const body = {mobileNumber: phoneNum};
      setIsLoading(false);
      navigation.navigate(AUTH_NAVIGATOR.ressetPass, {val: phoneNum});
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert(error ? error : 'Something went wrong!');
    }
  };

  return (
    <View>
      <Header isBackButton title={COMMON.mobileNmber} />
      <Papper style={styles.card}>
        <Image style={styles.logo} source={PATHS.blueLogo} />
        <Text style={styles.title}>{FORGOT_PASSWORD_SCREEN.formTitle}</Text>
        <Form
          initialValues={{mobileNumber: ''}}
          onSubmit={handleSubmit}
          validationSchema={phoneSchema}>
          <FormikTextInput
            type={FieldType.phone}
            name="mobileNumber"
            placeholder={COMMON.mobileNmber}
          />
          <Button
            style={styles.mt30}
            title={COMMON.next}
            type={ButtonT.submit}
            isLoading={isLoading}
          />
        </Form>
      </Papper>
    </View>
  );
};

export default ForgotPassword;
