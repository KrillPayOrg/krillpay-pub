import React from 'react';
import {Modal, Text, View, SafeAreaView, Platform, Linking} from 'react-native';
import Button from '../../Button';
import {COMMON} from '@kp/constants/appText';
import styles from './styles';
import {checkVersion} from 'react-native-check-version';

/**
 * UpdateModal Component
 * - Displays a modal prompting the user to update the app
 * - Retrieves the latest version URL using `react-native-check-version`
 * - Redirects users to the app store for updates
 */
const UpdateModal = ({modalVisible, toggleModal, style, text}: ModalProps) => {
  //to check veriosn of the app
  const updateApp = async () => {
    const version = await checkVersion();
    await Linking.openURL(version.url);
  };

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
            <Text style={styles.boldText}>{COMMON.updateApp}</Text>
            <Text style={styles.regularText}>{text}</Text>
            <Button
              onPress={updateApp}
              title={'Update App'}
              style={styles.started}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UpdateModal;
