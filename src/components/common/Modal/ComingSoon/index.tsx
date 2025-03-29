import React from 'react';
import {Modal, View, SafeAreaView, Text} from 'react-native';
import styles from './styles';
import {COMMON} from '@kp/constants/appText';
import Button from '../../Button';

/**
 * ComingSoonModal Component
 * - Displays a "Coming Soon" message for features that are not yet available
 * - Includes a close button to dismiss the modal
 * - Uses the `Button` component for the close button
 */
const ComingSoonModal = ({modalVisible, toggleModal, style}: ModalProps) => {
  return (
    <SafeAreaView style={[style]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>COMING SOON, Not Available Yet</Text>
            <Button
              onPress={toggleModal}
              title={COMMON.close}
              style={styles.generateButton}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ComingSoonModal;
