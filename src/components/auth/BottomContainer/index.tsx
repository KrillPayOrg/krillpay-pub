import React from 'react';
import styles from './styles';
import {Text, TouchableOpacity, View} from 'react-native';

/**
 * Renders a container with text and a clickable button at the bottom.
 * - Displays a title and a button with custom text.
 * - Applies custom styling to the container if provided.
 * - Triggers a callback when the button is pressed.
 */
const BottomContainer: React.FC<BottomContainer> = ({
  title,
  btnText,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.bottomText, styles.btnText]}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomContainer;
