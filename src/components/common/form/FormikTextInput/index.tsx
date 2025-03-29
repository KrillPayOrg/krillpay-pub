import React, {useRef, useState} from 'react';
import {useFormikContext} from 'formik';

import TextInput from '../TextInput';
import ErrorMessage from '../ErrorMessage';
import {FormField} from '../../../../../@types/form';
import PhoneNumInput from '../PhoneInput';
import {OtpInput} from 'react-native-otp-entry';
import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import FONT_FAMILY from '@kp/constants/fonts';
import {FieldType} from '@kp/constants/enum';
import DateInput from '../DateInput';
import PATHS from '@kp/constants/paths';
import InfoModal from '@kp/components/InfoModal';
import {COMMON} from '@kp/constants/appText';
import PhoneInput from 'react-native-phone-number-input';

/**
 * FormikTextInput Component
 * - A reusable input field that integrates with Formik
 * - Supports multiple field types (text, phone, OTP, date)
 * - Displays validation errors using ErrorMessage
 * - Includes optional info modal for additional guidance
 */
const FormikTextInput = ({
  type = 'default',
  Icon,
  name,
  label,
  length = 6,
  placeholder,
  width = '100%',
  maxLength,
  isTextArea,
  isInfo = false,
  secureTextEntry,
  ...otherProps
}: FormField) => {
  const [open, setOpen] = useState<boolean>(false);
  const phoneInput = useRef<PhoneInput>(null);

  const {errors, setFieldTouched, setFieldValue, touched, values} =
    useFormikContext<any>();

  /**
   * Toggles the information modal visibility
   */
  const toggleModal = () => setOpen(prev => !open);

  /**
   * Handles text input changes
   * - Special handling for 'krillTag' to ensure it starts with '@' and has no spaces
   * - Otherwise, sets the value directly in Formik
   */
  const handleTextChange = (text: string | number) => {
    if (name == 'krillTag') {
      if (text.toString().length === 0) {
        setFieldValue(name, '@');
      } else if (!text.toString().startsWith('@')) {
        setFieldValue(name, '@' + text);
      } else {
        setFieldValue(name, text.toString().replace(/\s/g, ''));
      }
    } else {
      setFieldValue(name, text);
    }
  };

  /**
   * Returns the appropriate input field based on the `type` prop
   */
  const getField = () => {
    switch (type) {
      case FieldType.phone:
        return (
          <PhoneNumInput
            phoneInput={phoneInput}
            onBlur={() => setFieldTouched(name)}
            onChangeText={(text: string | number) => {
              setFieldValue(name, text);
              setFieldValue(
                'mobileCountry',
                phoneInput.current?.getCountryCode() || '',
              );
            }}
            onChangeCountry={(text: any) => {
              setFieldValue('mobileCountry', text.cca2);
            }}
            Icon={Icon}
            placeholder={placeholder}
            value={values[name]}
            width={width}
            {...otherProps}
          />
        );

      case FieldType.otp:
        return (
          <View style={{width: length === 6 ? '100%' : '80%'}}>
            <OtpInput
              theme={{
                pinCodeContainerStyle: styles.otp,
                pinCodeTextStyle: {color: COLOR.medium},
              }}
              focusColor={COLOR.primary}
              textInputProps={{returnKeyType: 'done'}}
              secureTextEntry
              numberOfDigits={length}
              onTextChange={code => setFieldValue(name, code)}
              {...otherProps}
            />
          </View>
        );
      case FieldType.date:
        return (
          <DateInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={(text: string | number) => setFieldValue(name, text)}
            Icon={Icon}
            placeholder={placeholder}
            value={values[name]}
            width={width}
            {...otherProps}
          />
        );
      default:
        return (
          <TextInput
            isTextArea={isTextArea}
            onBlur={() => setFieldTouched(name, true)}
            onChangeText={(text: string | number) => handleTextChange(text)}
            Icon={Icon}
            placeholder={placeholder}
            value={values[name]}
            width={width}
            maxLength={maxLength}
            secureTextEntry={secureTextEntry}
            {...otherProps}
          />
        );
    }
  };
  return (
    <>
      <InfoModal open={open} onClose={toggleModal} text={COMMON.krillTagInfo} />
      {label ? (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {isInfo && (
            <TouchableOpacity onPress={toggleModal}>
              <Image style={styles.infoIcon} source={PATHS.info} />
            </TouchableOpacity>
          )}
        </View>
      ) : null}
      {getField()}
      <ErrorMessage
        error={errors[name]}
        visible={touched[name]}
        style={name == 'otp' || name == 'pin' ? styles.otpContainer : null}
      />
    </>
  );
};

export default FormikTextInput;

const styles = StyleSheet.create({
  otp: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderColor: COLOR.border,
    color: COLOR.black,
  },
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  infoIcon: {
    width: 18,
    height: 18,
  },
  label: {
    paddingLeft: 6,
    marginBottom: 6,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: FONT_FAMILY.interMedium,
    color: colorWithOpacity(COLOR.medium, 50),
  },
  otpContainer: {
    paddingTop: 15,
    marginBottom: 0,
  },
});
