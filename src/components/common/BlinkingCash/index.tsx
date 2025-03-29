import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {getFontSize} from '@kp/utils/helper';
import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';

interface BlinkingAmountProps {
  cash: string;
  toggleEnterCash: () => void;
  color?: string;
}

/**
 * BlinkingAmount Component
 * - Displays a cash amount with a blinking underscore.
 * - Blinks every 750ms to indicate an editable field.
 * - Adjusts font size dynamically based on the cash amount.
 * - Calls `toggleEnterCash` when tapped.
 */
const BlinkingAmount = ({
  cash,
  toggleEnterCash,
  color,
}: BlinkingAmountProps) => {
  const [blinking, setBlinking] = useState(1); // Start with visible (1)
  const [fontSize, setFontSize] = useState(22);

  /**
   * Sets up an interval to toggle the blinking state every 750ms.
   * Cleans up the interval on component unmount.
   */
  useEffect(() => {
    // Set up the interval to toggle blinking every 500ms
    const interval = setInterval(() => {
      setBlinking(prev => (prev === 1 ? 0 : 1)); // Toggle between 1 and 0
    }, 750);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  /**
   * Updates the font size dynamically based on the cash amount.
   */
  useEffect(() => {
    if (cash) {
      const fontSize = getFontSize(cash);
      console.log(fontSize, 'fontSizeee');
      setFontSize(fontSize);
    }
  }, [cash]);

  return (
    <TouchableOpacity onPress={toggleEnterCash}>
      <Text style={[styles.sendAmount, {fontSize: fontSize, color: color}]}>
        {cash ? parseFloat(cash).toFixed(2) : '0.00'}
        {blinking === 1 && (
          <Animated.Text
            style={{
              fontSize: fontSize,
              color: COLOR.medium,
              fontFamily: FONT_FAMILY.interBold,
            }}>
            _
          </Animated.Text>
        )}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sendAmount: {
    fontFamily: FONT_FAMILY.interBold,
    color: COLOR.medium,
  },
});

export default BlinkingAmount;
