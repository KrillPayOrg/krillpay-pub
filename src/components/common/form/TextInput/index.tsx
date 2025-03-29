import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import { TextInputField } from '../../../../../@types/form';
import { EyeIcon, EyeOff } from 'lucide-react-native';
import COLOR from '@kp/constants/colors';
import styles from './styles';

const AppTextInput = ({
  style,
  Icon,
  onChangeText,
  placeholder,
  value,
  width = '100%',
  maxLength,
  isTextArea = false,
  containerStyle,
  secureTextEntry,
  ...otherProps
}: TextInputField) => {
  const [iseyeOpen, setEyeOpen] = useState(!secureTextEntry);
  const toggleEyeIcon = () => {
    setEyeOpen(!iseyeOpen);
  }
  return (
    <View
      style={[
        styles.container,
        { width },
        containerStyle,
        isTextArea && { minHeight: 100 },
      ]}>
      {Icon && <Icon />}
      <TextInput
        multiline={isTextArea}
        numberOfLines={isTextArea ? 5 : 1}
        onChangeText={onChangeText}
        placeholder={placeholder}
        textAlignVertical='top'
        placeholderTextColor={COLOR.light}
        style={[
          styles.text,
          style,
          { marginLeft: Icon ? 10 : 0 },
          isTextArea && { height: '85%' },
        ]}
        maxLength={maxLength}
        value={value}
        secureTextEntry={secureTextEntry ? !iseyeOpen : false}
        {...otherProps}
      />
      {secureTextEntry && <TouchableOpacity onPress={toggleEyeIcon}>
        {iseyeOpen ?
          <EyeIcon color={COLOR.medium} size={20} /> :
          <EyeOff color={COLOR.medium} size={20} />}
      </TouchableOpacity>}
    </View>
  );
};

export default AppTextInput;
