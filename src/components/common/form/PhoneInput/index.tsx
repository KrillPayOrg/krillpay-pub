import React from 'react';
import Input, {isValidNumber} from 'react-native-phone-number-input';
import {TextInputField} from '../../../../../@types/form';
import styles from './styles';
import COLOR from '@kp/constants/colors';
import {getCountry} from 'react-native-localize';
import {Platform} from 'react-native';

/**
 * PhoneNumInput Component
 * - Custom phone number input field with country code selection
 * - Uses `react-native-phone-number-input` for formatting and validation
 * - Supports automatic country detection
 */
const PhoneNumInput = ({
  style,
  Icon,
  onChangeText,
  onChangeCountry,
  placeholder,
  value,
  phoneInput,
  ...otherProps
}: TextInputField) => {
  const code: any = getCountry();

  return (
    <Input
      ref={phoneInput}
      onChangeText={onChangeText}
      flagButtonStyle={{
        backgroundColor: COLOR.border,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        height: 50,
      }}
      textInputProps={{
        placeholderTextColor: COLOR.gray,
        selectionColor: COLOR.gray,
        maxLength: 10,
      }}
      onChangeCountry={onChangeCountry}
      codeTextStyle={{height: Platform.OS === 'android' ? 23 : 18.5}}
      value={value}
      placeholder={placeholder}
      textInputStyle={styles.text}
      textContainerStyle={styles.textContainer}
      containerStyle={styles.container}
      // defaultCode={['US', 'NG'].includes(code) ? code : 'US'}
      defaultCode={code}
      {...otherProps}
    />
  );
};

export default PhoneNumInput;
