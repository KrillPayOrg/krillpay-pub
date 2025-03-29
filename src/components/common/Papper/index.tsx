import React from 'react';
import {View} from 'react-native';
import styles from './styles';

interface Props extends React.PropsWithChildren {
  style?: any;
}

/**
 * Papper Component
 * - A reusable container component with a card-like style
 * - Supports custom styling via the `style` prop
 * - Wraps its children inside a styled `View`
 */
const Papper: React.FC<Props> = ({children, style = {}}) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Papper;
