import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import Button from '@kp/components/common/Button';
import {COMMON, SIGNUP_SUCCESS} from '@kp/constants/appText';
import {ScreenProps} from '../../../@types/form';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import SucessIcon from '@kp/svgs/SuccessIcon';
import PATHS from '@kp/constants/paths';

/**
 * SignupSuccessScreen
 * - Displays a success message after user registration
 * - Shows user’s name, country flag, and currency based on mobile country
 * - Provides navigation to the login screen
 */
const SignupSuccessScreen = ({navigation, route}: ScreenProps) => {
  const {body} = route.params ?? {};
  const flag =
    body.user.mobileCountry == 'US' ? PATHS.usaFlag : PATHS.nairaFlag;
  const currency = body.user.mobileCountry == 'US' ? 'USD' : 'NGN';

  /**
   * handleStep Function
   * - Navigates user to the login screen after successful signup
   */
  const handleStep = () => {
    navigation.replace(AUTH_NAVIGATOR.login);
  };

  return (
    <View style={styles.container}>
      <SucessIcon />
      <View style={styles.mainBody}>
        <Text style={styles.title}>
          Howdy {body.user.firstName} {body.user.lastName}
        </Text>

        <View style={styles.descContainer}>
          <Text style={styles.bodyDesc}>{SIGNUP_SUCCESS.longDesc}</Text>
          <View style={styles.shortDesc}>
            <Text style={[styles.bodyDesc, styles.lnh25]}>
              {`${SIGNUP_SUCCESS.shortDesc}\n ${currency}`}{' '}
            </Text>
            <Image style={styles.flag} source={flag} />
          </View>
        </View>
      </View>

      <Button title={COMMON.next} style={styles.btn} onPress={handleStep} />
    </View>
  );
};

export default SignupSuccessScreen;
