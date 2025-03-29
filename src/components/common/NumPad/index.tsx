import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import {dialPadContent, dialPadTextSize} from '@kp/constants/numpad';

/**
 * NumPad Component
 * - Custom numeric keypad for user input
 * - Supports dynamic updates via `updateCash` callback
 * - Displays numbers and a clear button with an image
 */
const NumPad: React.FC<NumPad> = ({style, updateCash}) => {
  /**
   * Handles press event on keypad buttons
   */
  const onPress = (item: string) => {
    updateCash(item);
  };
  return (
    <View style={[styles.numPadContainer, style]}>
      {dialPadContent.map(item => (
        <TouchableOpacity
          delayPressOut={0}
          key={item}
          style={styles.dialPadContainer}
          onPress={() => onPress(item.toString())}>
          {item === 'X' ? (
            <Image style={styles.logo} source={PATHS.clear} />
          ) : (
            <Text style={[{fontSize: dialPadTextSize}, styles.dialPadText]}>
              {item}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default React.memo(NumPad);
