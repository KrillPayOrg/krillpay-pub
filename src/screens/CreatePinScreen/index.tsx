import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '@kp/components/common/Button';
import {ButtonT} from '@kp/constants/enum';
import {
  COMMON,
  CREATE_PIN_SCREEN,
  RESET_PIN_SCREEN,
} from '@kp/constants/appText';
import {ScreenProps} from '../../../@types/form';
import {AUTH_NAVIGATOR, MAIN_NAVIGATOR} from '@kp/constants/routes';
import Form from '@kp/components/common/form/Form';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import Header from '@kp/components/common/Header';
import {pinSchema} from '@kp/validations/auth';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@kp/redux/slices';

/**
 * CreatePinScreen Component
 * - Handles PIN creation and navigation logic
 * - Supports both initial PIN setup and PIN reset flows
 * - Integrates with Formik for form state management
 */
const CreatePinScreen = ({route}: ScreenProps) => {
  const navigation = useNavigation<any>();
  const {token} = useAppSelector(state => state.user);

  const {values, otp, title, currentOtp, body} = route.params ?? {};
  console.log(otp, 'sss');

  /**
   * handleSubmit
   * - Handles PIN form submission
   * - Navigates to the appropriate confirmation screen based on user state
   */
  const handleSubmit = async (vals: any) => {
    if (values && !token) {
      return navigation.navigate(AUTH_NAVIGATOR.confirmPin, {
        title: CREATE_PIN_SCREEN.confirmPin,
        body: CREATE_PIN_SCREEN.confirmPinDesc,
        values,
        otp: vals,
      });
    } else if (values && token) {
      return navigation.navigate(MAIN_NAVIGATOR.ConfirmResetPin, {
        title: RESET_PIN_SCREEN.confirmPin,
        body: RESET_PIN_SCREEN.confirmPinDesc,
        currentOtp,
        values,
        otp: vals,
      });
    } else {
      return navigation.navigate(MAIN_NAVIGATOR.ConfirmResetPin, {
        title: RESET_PIN_SCREEN.confirmPin,
        body: RESET_PIN_SCREEN.confirmPinDesc,
        currentOtp,
        otp: vals,
      });
    }
  };

  return (
    <>
      <Header
        isBackButton
        isLeftTitle
        title={title}
        style={{height: 132, paddingTop: 50}}
      />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{body}</Text>
        </View>
        <Form
          validationSchema={pinSchema}
          initialValues={{pin: otp ? otp : ''}}
          onSubmit={handleSubmit}>
          <FormikTextInput name="pin" type="otp" length={4} />
          <Button
            title={COMMON.next}
            style={styles.btn}
            type={ButtonT.submit}
          />
        </Form>
      </View>
    </>
  );
};

export default CreatePinScreen;
