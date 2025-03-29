import React from 'react';
import {Modal, View, SafeAreaView, ActivityIndicator} from 'react-native';
import styles from './styles';
import COLOR from '@kp/constants/colors';

/**
 * LoaderModal Component
 * - Displays a loading spinner inside a modal
 * - Used to indicate a background process is running
 */
const LoaderModal = ({modalVisible, style}: LoaderModalProps) => {
  return (
    <SafeAreaView style={[style]}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size={'large'} color={COLOR.primary} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LoaderModal;
