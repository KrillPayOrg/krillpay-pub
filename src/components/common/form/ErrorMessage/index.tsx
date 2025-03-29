import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ErrorMessage as Props} from '../../../../../@types/form';
import COLOR from '@kp/constants/colors';

// component to throw an error message when anything fails
const ErrorMessage = ({error, visible, style}: Props) => {
  if (!visible || !error) return null;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.error}>{error as string}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -8,
    marginBottom: 12,
    alignItems: 'flex-start',
    width: '100%',
  },
  error: {
    marginLeft: 10,
    fontSize: 12,
    color: COLOR.danger,
  },
});

export default ErrorMessage;
