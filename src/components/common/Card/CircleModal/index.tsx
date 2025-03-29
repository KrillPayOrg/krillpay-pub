import React from 'react';
import {Modal, View, SafeAreaView} from 'react-native';
import styles from './styles';
import Button from '@kp/components/common/Button';
import {COMMON} from '@kp/constants/appText';

/**
 * CircleModal Component
 * - Displays a modal with a centered view and a button.
 * - Supports toggling visibility through `modalVisible` and `toggleModal`.
 * - Uses a fade animation for smooth appearance.
 */
const CircleModal = ({modalVisible, toggleModal, style}: CircleModal) => {
  return (
    <SafeAreaView style={[style]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View style={[styles.infoModal]}>
            <Button
              onPress={toggleModal}
              title={COMMON.ok}
              style={styles.started}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CircleModal;
