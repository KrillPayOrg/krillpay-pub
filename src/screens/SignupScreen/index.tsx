import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {COMMON, SIGNUP_SCREEN} from '@kp/constants/appText';
import Header from '@kp/components/common/Header';
import BottomContainer from '@kp/components/auth/BottomContainer';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import MobileIcon from '@kp/svgs/MobileIcon';
import SignupForm from '@kp/components/auth/signup/SignupForm';
import {FieldType} from '@kp/constants/enum';

import {ScreenProps} from '../../../@types/form';

import styles from './styles';
import {phoneSchema} from '@kp/validations/auth';

/**
 * SignupScreen
 * - Displays the signup form for user registration
 * - Includes mobile number input with validation
 * - Provides navigation to login screen if the user already has an account
 */
const SignupScreen = ({navigation, route}: ScreenProps) => {
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      {/* <ScrollView style={styles.container}> */}
      <Header title={COMMON.register} isBackButton />
      <SignupForm
        btnTitle="Send Code"
        title={SIGNUP_SCREEN.title}
        Icon={MobileIcon}
        isPrivacy
        fields={[
          {
            name: 'mobileNumber',
            label: COMMON.mobileNmber,
            type: FieldType.phone,
          },
        ]}
        validationSchema={phoneSchema}
      />
      {/* <BottomContainer
        style={styles.mgT}
        title={SIGNUP_SCREEN.alreadyHaveAccount}
        btnText={SIGNUP_SCREEN.loginHere}
        onPress={() => navigation.navigate(AUTH_NAVIGATOR.login)}
      /> */}
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
