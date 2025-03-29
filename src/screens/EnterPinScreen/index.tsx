import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import styles from './styles';
import Button from '@kp/components/common/Button';
import {AccountType, ButtonT} from '@kp/constants/enum';
import {COMMON, RESET_PIN_SCREEN} from '@kp/constants/appText';
import {ScreenProps} from '../../../@types/form';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import Form from '@kp/components/common/form/Form';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import Header from '@kp/components/common/Header';
import {pinSchema} from '@kp/validations/auth';
import {useNavigation} from '@react-navigation/native';
import {useVerifyPinMutation} from '@kp/redux/service/users';
import {useAccountContext} from '@kp/context/accountType';

/**
 * EnterPinScreen
 * - Allows users to enter their PIN for verification before resetting it
 * - Verifies the PIN through an API call and navigates to the reset PIN screen if successful
 * - Displays error alerts if verification fails
 */
const EnterPinScreen = ({route}: ScreenProps) => {
  const navigation = useNavigation<any>();
  const {accountType} = useAccountContext();
  const [verifyPin, {isLoading: isVerfiyLoading}] = useVerifyPinMutation();

  const {title, body} = route.params ?? {};

  /**
   * handleSubmit
   * - Handles PIN submission and verification
   * - Navigates to the Reset Pin screen if verification is successful
   * - Displays an alert if verification fails
   */
  const handleSubmit = async (vals: any) => {
    const type = accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS';
    try {
      const payload = {
        pin: vals.pin,
        accountType: type,
      };
      await verifyPin(payload).unwrap();
      return navigation.navigate(MAIN_NAVIGATOR.ResetPin, {
        title: RESET_PIN_SCREEN.Reset,
        body: RESET_PIN_SCREEN.desc,
        currentOtp: vals,
      });
    } catch (error: any) {
      console.log(error, 'errr');
      if ('data' in error) {
        Alert.alert(
          error.data?.message ? error.data?.message : COMMON.somethingWentWrong,
        );
      } else {
        Alert.alert(COMMON.somethingWentWrong);
      }
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
          initialValues={{pin: ''}}
          onSubmit={handleSubmit}>
          <FormikTextInput name="pin" type="otp" length={4} />
          <Button
            title={COMMON.next}
            style={styles.btn}
            type={ButtonT.submit}
            isLoading={isVerfiyLoading}
          />
        </Form>
      </View>
    </>
  );
};

export default EnterPinScreen;
