import React from 'react';
import {Modal, View, SafeAreaView, Text} from 'react-native';
import styles from './styles';
import {COMMON} from '@kp/constants/appText';
import Button from '../../Button';

/**
 * AlertModal Component
 * - A customizable modal for displaying alerts and confirmation messages
 * - Supports single or dual button configurations
 * - Integrates with external toggle functions for visibility control
 */
const AlertModal = ({
  modalVisible,
  toggleModal,
  style,
  message = 'Error',
  title = 'krillpay',
  row,
  onPressConfirm,
}: ModalProps) => {
  return (
    <SafeAreaView style={[style]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Text style={styles.modalText}>{message}</Text>
            <View
              style={{
                flexDirection: row ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: row ? 'space-between' : 'center',
              }}>
              {row && (
                <Button
                  onPress={onPressConfirm}
                  title={COMMON.ok}
                  style={styles.generateButton}
                  width={120}
                />
              )}
              <Button
                onPress={toggleModal}
                title={row ? COMMON.cancel : COMMON.close}
                style={styles.generateButton}
                width={row ? 120 : '100%'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AlertModal;
