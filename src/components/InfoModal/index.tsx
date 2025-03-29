import React from 'react';
import {Modal, Text, View} from 'react-native';
import Papper from '../common/Papper';
import Button from '../common/Button';
import styles from './styles';
import {COMMON} from '@kp/constants/appText';

/**
 * InfoModal Component
 * - Displays a modal dialog with a message and a confirmation button.
 * - Uses `Papper` for styled content wrapping.
 * - Supports a customizable button title and close action.
 * - Fades in/out with a transparent background for better UX.
 */
const InfoModal: React.FC<KrillInfoModal> = ({
  open,
  text,
  btnTitle,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <Papper style={styles.papper}>
          <Text style={styles.text}>{text}</Text>
          <Button title={btnTitle || COMMON.ok} onPress={onClose} />
        </Papper>
      </View>
    </Modal>
  );
};

export default InfoModal;
