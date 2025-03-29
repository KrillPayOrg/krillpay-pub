import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  Extrapolation,
} from 'react-native-reanimated';
import styles from './styles';
import COLOR from '@kp/constants/colors';
import {showToast} from '@kp/utils/common';
import {BiometricTypeEnum} from '../../../../@types/enum';
import useBiometricAuth from '@kp/hooks/useBiometricAuth';

const SWITCH_BUTTON_PADDING = 0;
const InterpolateXInput = [0, 1];

/**
 * ToggleSwitch Component
 * - Custom animated switch button with biometric authentication support
 * - Uses Reanimated for smooth transitions
 * - Handles biometric restrictions and shows toast messages accordingly
 */
const ToggleSwitch = ({onChange, value, height = 22, width = 37}: any) => {
  const BUTTON_WIDTH = width;
  const BUTTON_HEIGHT = height;
  const SWITCH_BUTTON_AREA = BUTTON_HEIGHT - SWITCH_BUTTON_PADDING;
  const {bioType} = useBiometricAuth();
  const shareValue = useSharedValue(value ? 1 : 0);
  const containerScale = {
    backgroundColor: value ? COLOR.primary : COLOR.light,
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
  };
  const switchScale = {
    height: SWITCH_BUTTON_AREA - 3,
    width: SWITCH_BUTTON_AREA - 3,
  };

  /**
   * Handles toggle change and invokes callback
   */
  const onChangeToggle = () => {
    onChange?.(!value);
  };

  /**
   * Handles switch press
   * - Checks biometric support
   * - Animates toggle state change
   * - Triggers `onChangeToggle` callback
   */
  const onPressSwitch = () => {
    if (bioType === BiometricTypeEnum.NotSupported) {
      showToast('Biometrics not supported');
    } else {
      if (shareValue.value === 0) {
        shareValue.value = withTiming(1, {
          duration: 300,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        });
      } else {
        shareValue.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        });
      }
      onChangeToggle();
    }
  };

  /**
   * Animated styles for switch button
   * - Interpolates translation for smooth movement
   */
  const switchAreaStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            shareValue.value,
            InterpolateXInput,
            [0, BUTTON_WIDTH - SWITCH_BUTTON_AREA - 2 * SWITCH_BUTTON_PADDING],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <TouchableOpacity
      onPress={onPressSwitch}
      activeOpacity={1}
      style={[styles.containerStyle, containerScale]}>
      <Animated.View
        style={[styles.switchButton, switchScale, switchAreaStyles]}
      />
    </TouchableOpacity>
  );
};

export default ToggleSwitch;
