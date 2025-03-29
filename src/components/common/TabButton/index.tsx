import React from 'react';
import {
  DimensionValue,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import {colorWithKey} from '@kp/constants/colors';
const {width: screenWidth} = Dimensions.get('screen');

/**
 * TabButton Component
 * - Custom button used in the bottom tab navigation
 * - Displays an icon and label for navigation
 * - Supports dynamic styling and width adjustments
 */
const TabButton: React.FC<TabButton> = ({
  style = {},
  title,
  onPress,
  width = '100%',
  image,
}) => {
  const _style = style as ViewStyle;
  const containerWidth = width as DimensionValue;
  const handlePress = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.btn,
          _style,
          {width: containerWidth, marginLeft: (screenWidth - 320) / 5},
        ]}>
        <View style={[styles.btn]}>
          <Image style={styles.logo} source={image} />
        </View>
        <Text
          style={[
            styles.text,
            {color: colorWithKey[style[1].backgroundColor]},
          ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabButton;
