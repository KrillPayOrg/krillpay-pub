import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigator from '@kp/navigation/StackNavigator/AuthNavigator';
import MyDrawer from './DrawerNavigator';
import {AUTH_NAVIGATOR, MAIN_NAVIGATOR} from '@kp/constants/routes';
import SplashScreen from '@kp/screens/SplashScreen';
import SendMoney from '@kp/screens/SendMoneyScreen';
import ReviewTransfer from '@kp/screens/ReviewTransferScreen';
import PinEntry from '@kp/screens/PinEntryScreen';
import TransactionComplete from '@kp/screens/TransactionCompleteScreen';
import DepositCashScreen from '@kp/screens/DepositCashScreen';
import ExchangeMoney from '@kp/screens/ExchangeMoneyScreen';
import RecipientScreen from '@kp/screens/RecipientScreen';
import UserCountryScreen from '@kp/screens/UserCountryScreen';
import BankTransferScreen from '@kp/screens/BankTransferScreen';
import ProfileScreen from '@kp/screens/ProfileScreen';
import SecurityScreen from '@kp/screens/SecurityScreen';
import Reset from '@kp/screens/Reset';
import CreatePinScreen from '@kp/screens/CreatePinScreen';
import ConfirmPinScreen from '@kp/screens/ConfirmPinScreen';
import KYCVerfication from '@kp/screens/KYCVerification';
import EnterPinScreen from '@kp/screens/EnterPinScreen';
import PolicyScreen from '@kp/screens/PolicyScreen';
import {useAppSelector} from '@kp/redux/slices';
import {PlaidLinkScreen} from '@kp/screens/PlaidViewScreen';
import ExternalBankTransferScreen from '@kp/screens/ExternalBankTransferScreen';
import TransactionFailure from '@kp/screens/TransactionFailScreen';
import VerifyOTP from '@kp/screens/VerifyOTP';
import YellowCardFlow from '@kp/screens/YellowCardScreen';
import MyStatusBar from '@kp/components/common/MyStatusBar';
import COLOR from '@kp/constants/colors';
import React from 'react';

const MainStack = createNativeStackNavigator();

const AppNavigator = () => {
  const {token, hideStatusBar, isFirstTime} = useAppSelector(
    state => state.user,
  );

  const linking = {
    prefixes: ['https://plaid.krillpay.com'],
    config: {
      screens: {
        PlaidViewScreen: 'plaid/:plaidId',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <MyStatusBar
        backgroundColor={hideStatusBar ? COLOR.white : COLOR.primaryLight}
        hidden={hideStatusBar}
      />
      <MainStack.Navigator
        initialRouteName={
          isFirstTime ? MAIN_NAVIGATOR.Auth : AUTH_NAVIGATOR.splash
        }
        screenOptions={{headerShown: false}}>
        {!token && (
          <>
            <MainStack.Screen
              name={MAIN_NAVIGATOR.Auth}
              component={AuthNavigator}
            />
            {!isFirstTime && (
              <MainStack.Screen
                name={AUTH_NAVIGATOR.splash}
                component={SplashScreen}
              />
            )}
            <MainStack.Screen
              name={MAIN_NAVIGATOR.PolicyScreen}
              component={PolicyScreen}
            />
          </>
        )}
        {token && (
          <>
            <MainStack.Screen
              name={MAIN_NAVIGATOR.Drawer}
              component={MyDrawer}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.Recipient}
              component={RecipientScreen}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.SendMoney}
              component={SendMoney}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.Review}
              component={ReviewTransfer}
            />
            <MainStack.Screen name={MAIN_NAVIGATOR.Pin} component={PinEntry} />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.TransactionComplete}
              component={TransactionComplete}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.TransactionFailure}
              component={TransactionFailure}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.Deposit}
              component={DepositCashScreen}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.Exchange}
              component={ExchangeMoney}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.UserCountryScreen}
              component={UserCountryScreen}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.YellowCardFlowScreen}
              component={YellowCardFlow}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.BankTransferScreen}
              component={BankTransferScreen}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.profileScreen}
              component={ProfileScreen}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.securityScreen}
              component={SecurityScreen}
            />
            <MainStack.Screen name={MAIN_NAVIGATOR.Reset} component={Reset} />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.ResetPin}
              component={CreatePinScreen}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.CurrentPin}
              component={EnterPinScreen}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.ConfirmResetPin}
              component={ConfirmPinScreen}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.KYCVerfication}
              component={KYCVerfication}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.PlaidView}
              component={PlaidLinkScreen}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.ExternalBankTransferScreen}
              component={ExternalBankTransferScreen}
            />
            <MainStack.Screen
              name={MAIN_NAVIGATOR.VerifyOTP}
              component={VerifyOTP}
            />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
