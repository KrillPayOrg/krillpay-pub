import React from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import {useFormikContext} from 'formik';
import {ButtonT} from '@kp/constants/enum';
import COLOR from '@kp/constants/colors';

/**
 * Button Component
 * - A customizable button with optional loading state.
 * - Supports `formik` integration for form submissions.
 * - Accepts custom styles, width, and button types (`default`, `submit`).
 * - Displays a loading indicator when `isLoading` is true.
 */
const Button: React.FC<Button> = ({
  style = {},
  title,
  onPress,
  width = '100%',
  type = ButtonT.default,
  isLoading = false,
  disabled = false,
  loaderColor = COLOR.white,
}) => {
  const _style = style as ViewStyle;
  const containerWidth = width as DimensionValue;
  const {handleSubmit} = useFormikContext<any>() || {};

  /**
   * Handles button press:
   * - If type is `submit`, triggers Formik's `handleSubmit`.
   * - Otherwise, calls the `onPress` function.
   */
  const handlePress = () => {
    if (type === ButtonT.submit) return handleSubmit();
    onPress?.();
  };

  return (
    <TouchableOpacity
      style={[styles.btn, _style, {width: containerWidth}]}
      onPress={handlePress}
      disabled={disabled}>
      {isLoading && (
        <ActivityIndicator
          style={styles.mr5}
          size="large"
          color={loaderColor}
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
