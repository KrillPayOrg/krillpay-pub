import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Button from '@kp/components/common/Button';
import HandMobile from '@kp/svgs/HandMobileIcon';
import {AccountType as AT, KP_SY_PARAM_USER_TYPE} from '@kp/constants/enum';
import {ACCOUNT_TYPE_SCREEN, COMMON} from '@kp/constants/appText';
import AccountCard from '@kp/components/auth/accountType/AccountCard';
import {ScreenProps} from '../../../@types/form';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import Header from '@kp/components/common/Header';

/**
 * SignupTypeScreen
 * - Allows users to select an account type (Individual or Business)
 * - Updates state based on user selection
 * - Navigates to the account details screen with selected type
 */
const SignupTypeScreen = ({navigation, route}: ScreenProps) => {
  const [type, setType] = useState<AccountType>(AT.INDIVIDUAL);
  const value = route.params;

  /**
   * handleType Function
   * - Updates the selected account type
   */
  const handleType = (type: AccountType) => {
    setType(type);
  };

  const goBack = () => {
    navigation.navigate(AUTH_NAVIGATOR.signup);
  };

  return (
    <>
      <Header title={''} style={{height: 50}} isBackButton goBack={goBack} />
      <View style={styles.container}>
        <HandMobile />
        <View style={styles.mainBody}>
          <Text style={styles.title}>
            {ACCOUNT_TYPE_SCREEN.titles.chooseType}
          </Text>

          <AccountCard
            isActive={type === AT.INDIVIDUAL}
            type={AT.INDIVIDUAL}
            title={ACCOUNT_TYPE_SCREEN.individul}
            onPress={handleType}
          />
          <AccountCard
            isActive={type === AT.BUSINESS}
            type={AT.BUSINESS}
            title={ACCOUNT_TYPE_SCREEN.business}
            onPress={handleType}
          />
        </View>

        <Button
          title={COMMON.next}
          style={styles.btn}
          onPress={() => {
            const newValue = {
              ...value,
              userType:
                type == 'individual'
                  ? KP_SY_PARAM_USER_TYPE.INDIVIDUAL
                  : KP_SY_PARAM_USER_TYPE.BUSINESS,
            };
            navigation.navigate(AUTH_NAVIGATOR.accountDetails, {
              type,
              val: newValue,
            });
          }}
        />
      </View>
    </>
  );
};

export default SignupTypeScreen;
