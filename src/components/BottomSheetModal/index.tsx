import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BottomSheet from '../common/BottomSheet';
import {styles} from './styles';
import {COMMON} from '@kp/constants/appText';
import PATHS from '@kp/constants/paths';

interface IBottomSheet {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handlePress: () => void;
  handleClose: () => void;
}

/**
 * BottomSheetModal Component
 * - Displays a bottom sheet modal with an option to add money when the balance is insufficient.
 * - Provides a close button to dismiss the modal.
 * - Uses the `BottomSheet` component to handle the modal UI.
 */
const BottomSheetModal: React.FC<IBottomSheet> = ({
  visible,
  setVisible,
  handlePress,
  handleClose,
}) => {
  return (
    <BottomSheet
      isBottomSheetOpen={visible}
      setIsBottomSheetOpen={setVisible}
      sheetStyle={styles.sheetConatiner}>
      <Pressable onPress={handleClose}>
        <Image
          source={PATHS.close}
          style={{height: 15, width: 15}}
          resizeMode="contain"
        />
      </Pressable>
      <View style={styles.sheetChildContainer}>
        <Image source={PATHS.lowFund} resizeMode="contain" />
        <Text style={styles.addMoneyTitle}>{COMMON.InsufficientBalance}</Text>
        <Text style={styles.addMoneyDes}>{COMMON.InsufficientBalanceDesc}</Text>
        <Pressable style={styles.addMoney} onPress={handlePress}>
          <Text style={styles.addMoneyText}>{COMMON.addMoney}</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
};

export default BottomSheetModal;
