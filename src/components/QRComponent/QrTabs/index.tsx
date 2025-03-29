import {QR_SCREEN} from '@kp/constants/appText';
import React from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import styles from './styles';

/**
 * QrTabs Component
 * - Provides a tab navigation between "Scan" and "QR Code" sections.
 * - Uses `react-native-reanimated` for smooth tab indicator animation.
 * - Dynamically calculates tab sizes based on screen width.
 */
const QrTabs: React.FC<QrTabs> = ({setActive, active}) => {
  const {width} = useWindowDimensions();

  //This is available tab container size after deduction of left and right padding
  const tabContainerSize = width - 60;

  const dimensions = useSharedValue(10);

  const handleActive = (tab: number) => {
    const traslate =
      tab === QR_SCREEN.qrTabs.scanTab ? 10 : tabContainerSize * 0.5 + 15; //This is responsive calculation for left size
    handleSwicth(traslate);
    setActive(tab);
  };

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{translateX: dimensions.value}],
  }));

  const handleSwicth = (value: number) => {
    dimensions.value = withTiming(value, {
      duration: 200,
    });
  };

  return (
    <View style={styles.tabContainer}>
      <Animated.View style={[styles.activeTab, logoStyle]} />
      <TouchableOpacity
        onPress={() => handleActive(QR_SCREEN.qrTabs.scanTab)}
        style={styles.tab}>
        <Text
          style={[
            styles.tabText,
            active === QR_SCREEN.qrTabs.scanTab && styles.activeText,
          ]}>
          {QR_SCREEN.scan}
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
          {QR_SCREEN.qrCode}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QrTabs;
