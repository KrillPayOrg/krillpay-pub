import React from 'react';
import styles from './styles';
import {Alert, Linking, Text, View} from 'react-native';
import {LOGIN_SCREEN, PrivacyURL} from '@kp/constants/appText';

/**
 * Renders a container for privacy-related navigation.
 * - Provides functionality to navigate to privacy URLs.
 */
const PrivacyContainer = () => {
  const navigateTo = async (screen: any) => {
    const url = PrivacyURL[screen];
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the URL
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <View style={styles.privacyContainer}>
      <Text style={styles.privacyText}>
        {LOGIN_SCREEN.privacy.iAgree}
        <Text
          onPress={() => navigateTo('termsConditions')}
          style={styles.highlightPrivacy}>
          {LOGIN_SCREEN.privacy.terms}
        </Text>
        {LOGIN_SCREEN.privacy.and}
        <Text
          onPress={() => navigateTo('privacyPolicy')}
          style={styles.highlightPrivacy}>
          {LOGIN_SCREEN.privacy.policy}
        </Text>
        {LOGIN_SCREEN.privacy.cybrid}
        <Text
          onPress={() => navigateTo('userAgreement')}
          style={styles.highlightPrivacy}>
          {LOGIN_SCREEN.privacy.userMan}
        </Text>
        {LOGIN_SCREEN.privacy.and}
        <Text
          onPress={() => navigateTo('partnerPrivacyPolicy')}
          style={styles.highlightPrivacy}>
          {LOGIN_SCREEN.privacy.policy}
        </Text>
        .
      </Text>
    </View>
  );
};

export default PrivacyContainer;
