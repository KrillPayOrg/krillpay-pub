import React from 'react';
import {Modal, Text, View, SafeAreaView} from 'react-native';
import styles from './styles';
import Button from '../../Button';
import {COMMON} from '@kp/constants/appText';

/**
 * InProcessKYC Component
 * - Displays a modal indicating that KYC (Know Your Customer) verification is in progress
 * - Shows a message explaining the verification status
 * - Provides a close button to dismiss the modal
 */
const InProcessKYC = ({modalVisible, toggleModal, style, text}: ModalProps) => {
  return (
    <SafeAreaView style={[style]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View
            style={[styles.verificationModal, styles.verificationModalHeight]}>
            <Text style={styles.boldText}>{COMMON.identityVerification}</Text>
            <Text style={styles.regularText}>{text}</Text>
            <Button
              onPress={toggleModal}
              title={'Close'}
              style={styles.started}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default InProcessKYC;
