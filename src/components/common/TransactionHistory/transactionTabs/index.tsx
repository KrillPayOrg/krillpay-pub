import {QR_SCREEN} from '@kp/constants/appText';
import React from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';
import {isSmallDevice} from '@kp/utils/helper';

const TransactionTabs: React.FC<QrTabs> = ({
  setActive,
  active,
  isOnHome = false,
}) => {
  const {width} = useWindowDimensions();

  //This is available tab container size after deduction of left and right padding
  const tabContainerSize = width - 60;

  const dimensions = useSharedValue(8);

  /**
   * Handles tab selection
   * - Updates active tab state
   * - Animates the indicator to the selected tab
   * @param {number} tab - The selected tab index
   */
  const handleActive = (tab: number) => {
    const traslate =
      tab === QR_SCREEN.qrTabs.scanTab
        ? 8
        : tabContainerSize * 0.5 +
          (isOnHome ? (isSmallDevice() ? -8 : -15) : 40); //This is responsive calculation for left size
    handleSwicth(traslate);
    setActive(tab);
  };

  /**
   * Provides animated styles for the active tab indicator
   * - Moves the indicator based on the selected tab
   */
  const logoStyle = useAnimatedStyle(() => ({
    transform: [{translateX: dimensions.value}],
  }));

  /**
   * Handles the switch animation
   * - Animates the active tab indicator movement
   * @param {number} value - The target position for the indicator
   */
  const handleSwicth = (value: number) => {
    dimensions.value = withTiming(value, {
      duration: 200,
    });
  };

  return (
    <View style={[styles.tabContainer, {width: isOnHome ? '75%' : '95%'}]}>
      <Animated.View style={[styles.activeTab, logoStyle]} />
      <TouchableOpacity
        onPress={() => handleActive(QR_SCREEN.qrTabs.scanTab)}
        style={styles.tab}>
        <Text
          style={[
            styles.tabText,
            active === QR_SCREEN.qrTabs.scanTab && styles.activeText,
          ]}>
          Transfers
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleActive(QR_SCREEN.qrTabs.qrTab)}
        style={styles.tab}>
        <Text
          style={[
            styles.tabText,
            active === QR_SCREEN.qrTabs.qrTab && styles.activeText,
          ]}>
          Trades
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionTabs;
