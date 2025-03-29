import React from 'react';
import {DimensionValue, Text, TouchableOpacity, ViewStyle} from 'react-native';
import styles from './styles';

interface Props extends Button, OutlineButton {}

/**
 * OutlinedButton Component
 * - A customizable button with an outlined style
 * - Supports icons, dynamic width, and rotation
 * - Can be styled externally via `style` prop
 */
const OutlinedButton: React.FC<Props> = ({
  style = {},
  title,
  onPress,
  width = '100%',
  Icon,
  rotate,
}) => {
  const _style = style as ViewStyle;
  const containerWidth = width as DimensionValue;

  return (
    <TouchableOpacity
      style={[styles.btn, _style, {width: containerWidth}]}
      onPress={onPress}>
      {Icon && <Icon rotate={rotate} />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OutlinedButton;
