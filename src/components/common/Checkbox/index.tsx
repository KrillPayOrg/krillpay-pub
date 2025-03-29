import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React from 'react';
import COLOR from '@kp/constants/colors';
import {StyleSheet} from 'react-native';

/**
 * Checkbox Component
 * - Custom checkbox using BouncyCheckbox
 * - Updates state when checked or unchecked
 * - Handles error visibility and messages
 */
const Checkbox = ({term, setTerm, setShowError, setError}: any) => {
  /**
   * Handles checkbox press event
   * - Updates term state
   * - Hides error message
   */
  const onPress = (isChecked: boolean) => {
    setTerm(isChecked);
    setShowError(false);
    setError('');
  };
  return (
    <BouncyCheckbox
      onPress={(isChecked: boolean) => onPress(isChecked)}
      fillColor={COLOR.primary}
      iconStyle={styles.checkIcon}
      innerIconStyle={[styles.checkIcon, styles.checkBorder]}
    />
  );
};

const styles = StyleSheet.create({
  checkIcon: {
    width: 25,
    height: 25,
    borderRadius: 6,
  },
  checkBorder: {
    borderColor: COLOR.primary,
  },
});

export default Checkbox;
