import React from 'react';
import {Modal, Text, View, SafeAreaView} from 'react-native';
import styles from './styles';

import Button from '@kp/components/common/Button';
import {COMMON, INFO_TEXT} from '@kp/constants/appText';

/**
 * InfoModal Component
 * - Displays an informational modal with a message based on `type`.
 * - Uses `INFO_TEXT` to fetch the corresponding message.
 * - Supports toggling visibility with `modalVisible` and `toggleModal`.
 * - Uses a fade animation for smooth appearance.
 */
const InfoModal = ({modalVisible, toggleModal, style, type}: InfoModal) => {
  return (
    <SafeAreaView style={[style]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View style={[styles.infoModal]}>
            <Text style={styles.text}>{INFO_TEXT[type]}</Text>
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

export default InfoModal;
