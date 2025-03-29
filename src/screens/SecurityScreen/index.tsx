import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '@kp/components/common/Header';
import {COMMON, RESET_PIN_SCREEN, SECUIRTY_SCREEN} from '@kp/constants/appText';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Alert, View} from 'react-native';
import PATHS from '@kp/constants/paths';
import SettingItem from '@kp/screens/SettingsScreen/SettingItem';
import {useNavigation} from '@react-navigation/native';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import {StorageTypeEnum} from '../../../@types/enum';
import {
  deleteStorageValue,
  getStorageValue,
  setStorageValue,
  showToast,
} from '@kp/utils/common';
import AlertModal from '@kp/components/common/Modal/AlertModal';
import LoaderModal from '@kp/components/common/Modal/LoaderModal';
import useBiometricAuth from '@kp/hooks/useBiometricAuth';
import {deleteAPI, post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import {useAppSelector} from '@kp/redux/slices';
import {resetPasswordValidation} from '@kp/validations/auth';

const SecurityScreen = (props: {navigation: any}) => {
  const {info} = useAppSelector(state => state.user);
  const {navigate} = useNavigation<any>();
  const {ifKeyExist, authenticate, createKeys, deleteKeys} = useBiometricAuth();
  const [deleteBioKeys, setDeleteBioKeys] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  /**
   * resetPassword
   * - Navigates to the reset password screen
   * - Passes required parameters for password reset validation
   */
  const resetPassword = () => {
    navigate(MAIN_NAVIGATOR.Reset, {
      header: 'Reset Password',
      title: 'Reset Your Password',
      validations: resetPasswordValidation,
      fields: ['currentPassword', 'newPassword', 'confirmNewPassword'],
      key: 'password',
    });
  };

  /**
   * resetEmail
   * - Navigates to the reset email screen
   */
  const resetEmail = () => {
    navigate(MAIN_NAVIGATOR.Reset, {
      header: 'Reset Email',
      title: 'Reset Your Email',
      fields: ['newEmail'],
    });
  };

  /**
   * changePhoneNum
   * - Navigates to the change phone number screen
   */
  const changePhoneNum = () => {
    navigate(MAIN_NAVIGATOR.Reset, {
      header: 'Change Your Number',
      title: 'Change Your Phone Number',
      fields: ['newPhone'],
      type: 'phone',
    });
  };

  /**
   * resetPin
   * - Navigates to the reset PIN screen
   */
  const resetPin = () => {
    navigate(MAIN_NAVIGATOR.CurrentPin, {
      title: RESET_PIN_SCREEN.ResetStart,
      body: RESET_PIN_SCREEN.ResetStartDesc,
    });
  };

  /**
   * forgotPin
   * - Sends OTP to user’s phone for PIN reset
   * - Navigates to OTP verification screen if successful
   */
  const forgotPin = async () => {
    try {
      const body = {mobileNumber: info.mobileNumber};
      console.log(body, 'bodyy==>');
      const response = await post(URLS.sendOtpOnUserPhone, body);
      if (response) {
        navigate(MAIN_NAVIGATOR.VerifyOTP);
      }
    } catch (error: any) {
      Alert.alert(error ? error : 'Something Went Wrong');
    }
  };

  /**
   * handleBiometrics
   * - Handles biometric authentication setup and deletion
   * - Registers public keys if authentication is successful
   */
  const handleBiometrics = async (value: boolean) => {
    const verify = await authenticate();

    if (value && verify) {
      setLoading(true);
      const publicKey = await ifKeyExist();
      if (!publicKey) {
        try {
          const publicKey = await createKeys();
          const body = {bioString: publicKey};
          const response = await post(URLS.bioRegisterFromSettings, body);
          if (response.data) {
            console.log('response from bio-register', response.data);
            setStorageValue('biometricLogin', true);
            setStorageValue('publicKey', publicKey);
            showToast('Biometrics has successfully registered');
          }
        } catch (error: any) {
          console.log(error);
          setLoading(false);
          setStorageValue('biometricLogin', false);
          deleteStorageValue('publicKey');
        }
      }
      setLoading(false);
    } else {
      const publicKey = await getStorageValue(
        'publicKey',
        StorageTypeEnum.String,
      );
      publicKey && setDeleteBioKeys(true);
    }
  };

  /**
   * handleDeleteKey
   * - Deletes stored biometric key and updates state
   */
  const handleDeleteKey = async () => {
    try {
      const publicKey = await getStorageValue(
        'publicKey',
        StorageTypeEnum.String,
      );
      if (publicKey) {
        const endpoint = `${URLS.bioDelete}?bioString=${publicKey}`;
        const response = await deleteAPI(endpoint);
        setLoading(true);
        if (response.data) {
          setStorageValue('biometricLogin', false);
          deleteKeys(); // Ensure this function securely deletes the keys from the device
          deleteStorageValue('publicKey');
          setDeleteBioKeys(false);
        }
        setLoading(false);
      } else {
        console.log('No public key found.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error in handleDeleteKey:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoaderModal modalVisible={loading} />}
      {deleteBioKeys && (
        <AlertModal
          title="Disable Biometric Login"
          message="You would need to enter your Login Id and Password to Login"
          row
          modalVisible={deleteBioKeys}
          toggleModal={() => {
            setDeleteBioKeys(false);
            setStorageValue('biometricLogin', true);
          }}
          onPressConfirm={handleDeleteKey}
        />
      )}
      <Header
        title={COMMON.loginSecurity}
        style={styles.header}
        isLeftTitle
        isBackButton
        navigation={props.navigation}
      />
      <View>
        <SettingItem
          title={SECUIRTY_SCREEN.resetPassword}
          image={PATHS.resetPass}
          style={styles.profileColor}
          onPress={resetPassword}
        />
        <SettingItem
          title={SECUIRTY_SCREEN.changePin}
          image={PATHS.changePin}
          style={styles.avatarColor}
          onPress={resetPin}
        />
        <SettingItem
          title={SECUIRTY_SCREEN.forgotPin}
          image={PATHS.forgotPin}
          style={styles.biometricColor}
          onPress={forgotPin}
        />
        <SettingItem
          title={SECUIRTY_SCREEN.changeEmail}
          image={PATHS.message}
          style={styles.emailColor}
          onPress={resetEmail}
        />
        <SettingItem
          title={SECUIRTY_SCREEN.changePhone}
          image={PATHS.call}
          style={styles.phoneNumColor}
          onPress={changePhoneNum}
        />
        <SettingItem
          title={SECUIRTY_SCREEN.biometricLogin}
          styleSubContainer={styles.biometric}
          image={PATHS.fingerprint}
          isRadio={true}
          toggleValue={
            getStorageValue('biometricLogin', StorageTypeEnum.Boolean) || false
          }
          onPressToggle={value => handleBiometrics(value)}
          style={styles.biometricColor}
        />
      </View>
    </SafeAreaView>
  );
};

export default SecurityScreen;
