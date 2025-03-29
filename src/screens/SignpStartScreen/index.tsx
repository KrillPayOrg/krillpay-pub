import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Button from '@kp/components/common/Button';
import HandMobile from '@kp/svgs/HandMobileIcon';
import MobilePayIcon from '@kp/svgs/MobilePayIcon';
import {ACCOUNT_TYPE_SCREEN, COMMON} from '@kp/constants/appText';
import {ScreenProps} from '../../../@types/form';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';

/**
 * SignupStartScreen
 * - Displays a two-step signup introduction screen
 * - Allows users to proceed to the signup process
 */
const SignupStartScreen = ({navigation}: ScreenProps) => {
  const [step, setStep] = useState(1);

  /**
   * handleStep
   * - Moves to the next step in the signup process
   * - Navigates to the signup screen when the last step is reached
   */
  const handleStep = () => {
    if (step === 2) return navigation.replace(AUTH_NAVIGATOR.signup);
    setStep(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.skipContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(AUTH_NAVIGATOR.signup)}>
          <Text style={styles.skip}>{COMMON.skip}</Text>
        </TouchableOpacity>
      </View>
      {step === 2 ? <MobilePayIcon /> : <HandMobile />}
      <View style={styles.mainBody}>
        <Text style={styles.title}>{ACCOUNT_TYPE_SCREEN.titles[step]}</Text>
        <View style={styles.descContainer}>
          <Text style={styles.bodyDesc}>{ACCOUNT_TYPE_SCREEN.descs[step]}</Text>
        </View>
      </View>
      <View style={styles.stepsContainer}>
        <View style={[styles.step, step === 1 && styles.active]} />
        <View style={[styles.step, styles.ml4, step === 2 && styles.active]} />
      </View>

      <Button title={COMMON.next} style={styles.btn} onPress={handleStep} />
    </View>
  );
};

export default SignupStartScreen;
