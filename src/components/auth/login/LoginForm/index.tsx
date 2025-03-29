import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Papper from '@kp/components/common/Papper';
import Form from '@kp/components/common/form/Form';
import PATHS from '@kp/constants/paths';
import {
  COMMON,
  ENABLE_BIO_SCREEN,
  LOGIN_SCREEN,
  PrivacyURL,
} from '@kp/constants/appText';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import {loginSchema} from '@kp/validations/auth';
import LockIcon from '@kp/svgs/LockIcon';
import {ButtonT, FieldType} from '@kp/constants/enum';
import Button from '@kp/components/common/Button';
import PrivacyContainer from '../PrivacyContainer';
import styles from './styles';
import {ScanFaceIcon, FingerprintIcon} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import {post, deleteAPI} from '@kp/client/services/api';
import {MMKV} from 'react-native-mmkv';
import {setMobileNumber} from '@kp/utils/login';
import {URLS} from '@kp/constants/api';
import {
  deleteStorageValue,
  getStorageValue,
  setStorageValue,
  showToast,
} from '@kp/utils/common';
import useBiometricAuth from '@kp/hooks/useBiometricAuth';
import {BiometricTypeEnum, StorageTypeEnum} from '../../../../../@types/enum';
import AlertModal from '@kp/components/common/Modal/AlertModal';
import ToggleSwitch from 'toggle-switch-react-native';
import {useAppDispatch} from '@kp/redux/slices';
import {loginUserState} from '@kp/redux/slices/userSlice';
import COLOR from '@kp/constants/colors';
import BottomContainer from '../../BottomContainer';

/**
 * Renders the login form component with biometric support.
 * - Manages biometric authentication and login state.
 * - Handles navigation, errors, and local storage.
 */

const LoginForm: React.FC<LoginForm> = ({isBio = false}) => {
  const {ifKeyExist, bioType, authenticate, createKeys, deleteKeys} =
    useBiometricAuth();
  const {navigate} = useNavigation<any>();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [biometricError, setbiometricError] = useState(false);
  const [deleteBioKeys, setDeleteBioKeys] = useState(false);
  const storage = new MMKV();

  /**
   * Determines if the login button should be disabled based on biometric login setting.
   * - Retrieves the biometric login value from storage.
   * - Returns false if biometric login is enabled, true otherwise.
   */
  const isButtonDisabled = getStorageValue(
    'biometricLogin',
    StorageTypeEnum.Boolean,
  )
    ? false
    : true;

  /**
   * Handles login form submission with or without biometric authentication.
   * - Processes biometric login if enabled, otherwise uses standard login.
   * - Manages loading state, error handling, and navigation on success.
   */
  const handleSubmit = async (val: any) => {
    if (isBio) {
      toggleLoading();
      try {
        const publicKey = await createKeys();
        const mobileNumber = setMobileNumber(
          val.mobileCountry,
          val.mobileNumber,
        );
        const body = {
          mobileNumber: mobileNumber,
          password: val.password,
          bioString: publicKey,
        };
        const response = await post(URLS.bioRegister, body);
        if (response.data) {
          setStorageValue('biometricLogin', true);
          setStorageValue('publicKey', publicKey);
          setStorageValue('accessToken', response.data.accessToken);
          setStorageValue('refreshToken', response.data.refreshToken);
          toggleLoading();
          dispatch(loginUserState(response.data));
        }
      } catch (error: any) {
        console.log(error);
        setStorageValue('biometricLogin', false);
        deleteStorageValue('publicKey');
        toggleLoading();
        toggleError();
        setError(`Login Failed: ${error || ''}`);
      }
    } else {
      toggleLoading();
      try {
        const mobileNumber = setMobileNumber(
          val.mobileCountry,
          val.mobileNumber,
        );
        const body = {mobileNumber: mobileNumber, password: val.password};
        showError && toggleError();
        const response = await post(URLS.login, body);
        if (response) {
          storage.set('accessToken', response.data.accessToken);
          toggleLoading();
          dispatch(loginUserState(response.data));
        }
      } catch (error: any) {
        console.log(error, 'sssssas');
        toggleLoading();
        toggleError();
        setError(`Login Failed: ${error || ''}`);
      }
    }
  };

  const toggleError = () => {
    setShowError(prev => !prev);
  };

  /**
   * Toggles the loading indicator state.
   * - Inverts the current isLoading state.
   */
  const toggleLoading = () => {
    setIsLoading(prev => !prev);
  };

  /**
   * Navigates to the Forgot Password screen.
   * - Passes navigation prop to the ForgotPassword route.
   */
  const handleForgotPassword = () => {
    navigate('ForgotPassword', {navigation: navigate}); // Navigate to the Forgot Password screen
  };

  /**
   * Handles login using biometric authentication.
   * - Checks biometric support and stored credentials.
   * - Authenticates user and logs in with biometric data.
   * - Manages loading state, errors, and user state updates.
   */
  const handleBiometricsLogin = async () => {
    if (bioType === BiometricTypeEnum.NotSupported) {
      return showToast('Biometrics not supported');
    }

    const isBiometricLoginEnabled = getStorageValue(
      'biometricLogin',
      StorageTypeEnum.Boolean,
    );
    if (!isBiometricLoginEnabled) {
      return setbiometricError(true);
    }

    const publicKey = await getStorageValue(
      'publicKey',
      StorageTypeEnum.String,
    );
    if (!publicKey) {
      return setbiometricError(true);
    }

    /**
     * Authenticates user with biometrics and performs login.
     * - Verifies biometric auth and sends login request.
     * - Stores tokens and updates user state on success.
     */
    const authenticateAndLogin = async () => {
      toggleLoading();
      try {
        const isAuthenticated = await authenticate();
        if (!isAuthenticated) {
          throw new Error('Authentication failed');
        }

        const body = {bioString: publicKey};
        const response = await post(URLS.bioLogin, body);
        if (!response?.data) {
          throw new Error('Invalid response from server');
        }

        setStorageValue('accessToken', response.data.accessToken);
        setStorageValue('refreshToken', response.data.refreshToken);
        dispatch(loginUserState(response.data));
      } catch (error: any) {
        console.error('Biometric login error:', error);
        toggleError();
        setError(`Login Failed: ${error?.message || ''}`);
      } finally {
        toggleLoading();
      }
    };

    await authenticateAndLogin();
  };

  /**
   * Manages biometric authentication settings based on a toggle value.
   * - Enables biometric login if value is true and authentication succeeds.
   * - Prompts to delete biometric keys if value is false and keys exist.
   */
  const handleBiometrics = async (value: boolean) => {
    if (value) {
      const verify = await authenticate();
      if (verify) {
        const publicKey = await ifKeyExist();
        console.log(publicKey, 'sss');
        if (!publicKey) navigate(AUTH_NAVIGATOR.enableBioLogin);
        else {
          setStorageValue('biometricLogin', true);
        }
      }
    } else {
      const publicKey = await getStorageValue(
        'publicKey',
        StorageTypeEnum.String,
      );

      const bioKey = await getStorageValue(
        'biometricLogin',
        StorageTypeEnum.Boolean,
      );

      if (publicKey || bioKey) {
        setDeleteBioKeys(true);
      }
    }
  };

  /**
   * Navigates to a specified URL based on the provided screen key.
   * - Retrieves the URL from a predefined mapping.
   * - Checks if the URL can be opened and opens it if supported.
   * - Shows an alert if the URL cannot be opened.
   */
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

  /**
   * Deletes biometric keys and updates related settings.
   * - Retrieves stored public key and biometric login status.
   * - Removes biometric login settings or deletes keys via API if they exist.
   * - Handles errors and logs them if deletion fails.
   */
  const handleDeleteKey = async () => {
    try {
      const publicKey = await getStorageValue(
        'publicKey',
        StorageTypeEnum.String,
      );
      const bioKey = await getStorageValue(
        'biometricLogin',
        StorageTypeEnum.Boolean,
      );

      if (bioKey && !publicKey) {
        setStorageValue('biometricLogin', false);
        setDeleteBioKeys(false);
        deleteKeys();
      }
      if (publicKey) {
        const endpoint = `${URLS.bioDelete}?bioString=${publicKey}`;
        const response = await deleteAPI(endpoint);

        if (response.data) {
          setStorageValue('biometricLogin', false);
          deleteKeys(); // Ensure this function securely deletes the keys from the device
          deleteStorageValue('publicKey');
          setDeleteBioKeys(false);
        }
      } else {
        console.log('No public key found.');
      }
    } catch (error) {
      console.error('Error in handleDeleteKey:', error);
    }
  };

  return (
    <Papper style={styles.card}>
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
      {biometricError && (
        <AlertModal
          message="Enable biometric login first"
          modalVisible={biometricError}
          toggleModal={() => setbiometricError(false)}
        />
      )}
      {isBio ? (
        <View style={styles.topIconContainer}>
          <View style={styles.bgContainer} />
          <View style={styles.fillContainer} />
          <Image style={styles.topIcon} source={PATHS.faceScan} />
          <Image style={styles.topIcon} source={PATHS.fingerprint} />
          <Image style={styles.badgeIcon} source={PATHS.lockbadge} />
        </View>
      ) : (
        <Image style={styles.logo} source={PATHS.blueLogo} />
      )}
      <Text style={styles.title}>
        {isBio ? ENABLE_BIO_SCREEN.title : LOGIN_SCREEN.formTitle}
      </Text>

      <Form
        initialValues={{mobileNumber: '', mobileCountry: '', password: ''}}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}>
        <FormikTextInput
          type={FieldType.phone}
          name="mobileNumber"
          placeholder={COMMON.mobileNmber}
        />
        <FormikTextInput
          Icon={LockIcon}
          name="password"
          placeholder={COMMON.password}
          secureTextEntry
        />
        {showError && <Text style={styles.errorText}>{error}</Text>}
        {isBio && (
          <>
            <View style={styles.checkBoxContainer}>
              <Text style={styles.checkboxText}>
                {ENABLE_BIO_SCREEN.iAgree}{' '}
                <Text
                  onPress={() => navigateTo('termsConditions')}
                  style={styles.heighlight}>
                  {ENABLE_BIO_SCREEN.terms}
                </Text>
              </Text>
            </View>
            <View style={styles.checkBoxContainer}>
              <Text style={styles.checkboxText}>
                {ENABLE_BIO_SCREEN.allowAccess}
              </Text>
            </View>
          </>
        )}

        {!isBio && (
          <View style={styles.forgotPassContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPass}>
                {LOGIN_SCREEN.forgotPassword}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Button
          style={isBio ? {marginTop: 60} : styles.mt10}
          title={isBio ? COMMON.continue : COMMON.login}
          isLoading={isLoading}
          type={ButtonT.submit}
        />

        {!isBio && (
          <View style={styles.bioContainer}>
            <TouchableOpacity
              onPress={handleBiometricsLogin}
              style={styles.bioBtn}
              disabled={isButtonDisabled}>
              <ScanFaceIcon
                size={32}
                color={isButtonDisabled ? COLOR.black : COLOR.primary}
              />
              <FingerprintIcon
                size={28}
                color={isButtonDisabled ? COLOR.black : COLOR.primary}
              />
            </TouchableOpacity>
            <View style={styles.bioBtn}>
              <View style={styles.mr12}>
                <Text style={styles.bioText}>{LOGIN_SCREEN.enableBio}</Text>
              </View>
              <ToggleSwitch
                isOn={
                  getStorageValue('biometricLogin', StorageTypeEnum.Boolean) ||
                  false
                }
                onColor={COLOR.primary}
                offColor={COLOR.light}
                size="medium"
                onToggle={(isOn: boolean) => handleBiometrics(isOn)}
              />
            </View>
          </View>
        )}
        {!isBio && <PrivacyContainer />}
      </Form>
      <BottomContainer
        style={styles.bottomContainer}
        title={LOGIN_SCREEN.dontHaveAccount}
        btnText={COMMON.signup}
        onPress={() => navigate(AUTH_NAVIGATOR.signupStart)}
      />
    </Papper>
  );
};

export default LoginForm;
