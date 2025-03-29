import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {ScreenProps} from '../../../@types/form';

import Header from '@kp/components/common/Header';
import {COMMON} from '@kp/constants/appText';
import Papper from '@kp/components/common/Papper';
import PATHS from '@kp/constants/paths';
import {copyToClipboard} from '@kp/utils/common';

/**
 * ContactUs Component
 * - Displays contact information including email, phone, and office locations
 * - Allows users to copy contact details to clipboard
 * - Provides a header with a back button for navigation
 */
const ContactUs = ({navigation}: ScreenProps) => {
  /**
   * goBack Function
   * - Navigates back to the previous screen
   */
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header
        isLeftTitle
        isBackButton
        title={COMMON.contactUs}
        goBack={goBack}
        style={styles.header}
      />
      <Papper style={styles.card}>
        <View style={styles.inTouchContainer}>
          <Text style={styles.text}>Get In Touch With Us</Text>
          <View style={styles.connectView}>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={PATHS.mail} />
            </View>
            <View style={styles.connectList}>
              <Text style={styles.connectTitleText}>Send us an Email</Text>
              <TouchableOpacity
                onPress={() => copyToClipboard('support@krillpay.com')}>
                <Text style={styles.connectText}>support@krillpay.com</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.connectView}>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={PATHS.phone} />
            </View>
            <View style={styles.connectList}>
              <Text style={styles.connectTitleText}>Give us a Call</Text>
              {/* <TouchableOpacity
                onPress={() => copyToClipboard('+1 938-777-3303')}>
                <Text style={styles.connectText}>+1 938-777-3303</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.connectView}>
            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={PATHS.location} />
            </View>
            <View style={styles.connectList}>
              <Text style={styles.connectTitleText}>Our office locations</Text>
              <Text numberOfLines={2} style={styles.connectText}>
                {'Birmingham AL, USA\nLagos, Nigeria'}
              </Text>
            </View>
          </View>
        </View>
      </Papper>
    </>
  );
};

export default ContactUs;
