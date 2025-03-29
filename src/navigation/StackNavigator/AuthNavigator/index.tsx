import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import LoginScreen from '@kp/screens/LoginScreen';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import SignupTypeScreen from '@kp/screens/SignupTypeScreen';
import SignupScreen from '@kp/screens/SignupScreen';
import VerifyAuthOTPScreen from '@kp/screens/VerifyAuthOTPScreen';
import AccountDetailsScreen from '@kp/screens/AccountDetailsScreen';
import CreatePinScreen from '@kp/screens/CreatePinScreen';
import SignupSuccessScreen from '@kp/screens/SignupSuccessScreen';
import EnableBioLoginScreen from '@kp/screens/EnableBioLoginScreen';
import ForgotPassword from '@kp/components/auth/login/ForgotPassword';
import ForgotOTP from '@kp/components/auth/login/ForgotOTP';
import ResetPass from '@kp/components/auth/login/ResetPass';
import SignupStartScreen from '@kp/screens/SignpStartScreen';
import ConfirmPinScreen from '@kp/screens/ConfirmPinScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={AUTH_NAVIGATOR.login}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={AUTH_NAVIGATOR.login} component={LoginScreen} />
      <Stack.Screen
        name={AUTH_NAVIGATOR.enableBioLogin}
        component={EnableBioLoginScreen}
      />
      <Stack.Screen
        name={AUTH_NAVIGATOR.signupStart}
        component={SignupStartScreen}
      />
      <Stack.Screen
        name={AUTH_NAVIGATOR.signupType}
        component={SignupTypeScreen}
      />
      <Stack.Screen name={AUTH_NAVIGATOR.signup} component={SignupScreen} />
      <Stack.Screen
        name={AUTH_NAVIGATOR.verifyAuthOtp}
        component={VerifyAuthOTPScreen}
      />
      <Stack.Screen name={AUTH_NAVIGATOR.forgotOTP} component={ForgotOTP} />
      <Stack.Screen name={AUTH_NAVIGATOR.ressetPass} component={ResetPass} />
      <Stack.Screen
        name={AUTH_NAVIGATOR.accountDetails}
        component={AccountDetailsScreen}
      />
      <Stack.Screen
        name={AUTH_NAVIGATOR.createPin}
        component={CreatePinScreen}
      />
      <Stack.Screen
        name={AUTH_NAVIGATOR.confirmPin}
        component={ConfirmPinScreen}
      />
      <Stack.Screen
        name={AUTH_NAVIGATOR.signupSuccess}
        component={SignupSuccessScreen}
      />
      <Stack.Screen
        name={AUTH_NAVIGATOR.forgotPassword}
        component={ForgotPassword}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
