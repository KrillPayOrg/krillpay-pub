import React, {FC} from 'react';
import {Modal, Pressable, ViewStyle} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';

import styles from './styles';
import COLOR from '@kp/constants/colors';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface IBottomSheetProps {
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode | React.ReactNodeArray;
  sheetStyle?: ViewStyle;
  header?: React.ReactNode | React.ReactNodeArray;
}

/**
 * BottomSheet Component
 * - Displays a modal bottom sheet with animation effects.
 * - Uses `react-native-reanimated` for smooth slide-in and fade-in effects.
 * - Closes when tapping on the backdrop.
 * - Accepts custom styles, children, and an optional header.
 */
const BottomSheet: FC<IBottomSheetProps> = ({
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  children,
  sheetStyle = {height: '70%', backgroundColor: COLOR.white},
}) => {
  /**
   * Handles closing the bottom sheet by updating state.
   */
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isBottomSheetOpen}
      onRequestClose={handleCloseBottomSheet}>
      <AnimatedPressable
        style={styles.backdrop}
        testID={'backdrop'}
        entering={FadeIn}
        exiting={FadeOut}
        onPress={event =>
          event?.target === event?.currentTarget && handleCloseBottomSheet()
        }>
        <Animated.View
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown}
          style={[styles.bottomSheet, sheetStyle]}>
          {children}
        </Animated.View>
      </AnimatedPressable>
    </Modal>
  );
};

export default BottomSheet;
