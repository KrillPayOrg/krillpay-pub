import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '@kp/components/common/Button';
import {AccountType, ButtonT} from '@kp/constants/enum';
import {
  COMMON,
  CREATE_PIN_SCREEN,
  RESET_PIN_SCREEN,
} from '@kp/constants/appText';
import {ScreenProps} from '../../../@types/form';
import {
  AUTH_NAVIGATOR,
  DRAWER_NAVIGATOR,
  MAIN_NAVIGATOR,
} from '@kp/constants/routes';
import Form from '@kp/components/common/form/Form';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import Header from '@kp/components/common/Header';
import {pinSchema} from '@kp/validations/auth';
import {post} from '@kp/client/services/api';
import {removeEmptyValues} from '@kp/utils/sanitizeValues';
import {URLS} from '@kp/constants/api';
import {useAppSelector} from '@kp/redux/slices';
import {useAccountContext} from '@kp/context/accountType';
import {showToast} from '@kp/utils/common';

const ConfirmPinScreen = ({navigation, route}: ScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const {token} = useAppSelector(state => state.user);
  const {accountType} = useAccountContext();

  const {values, otp} = route.params;

  /**
   * handleSubmit
   * - Submits the PIN confirmation form
   * - Validates the PIN and makes API requests based on user state
   * - Navigates user based on success or failure
   */
  const handleSubmit = async (vals: any) => {
    toggleLoading();

    const handleError = (errorMessage: string) => {
      setError(errorMessage);
      toggleError();
      toggleLoading();
    };

    //for submission of form
    const submitForm = async (
      url: string,
      body: any,
      successCallback: () => void,
    ) => {
      try {
        const response = await post(url, body);
        if (response) {
          successCallback();
        }
      } catch (error) {
        handleError(`Sign Up Failed: ${error || ''}`);
      }
    };

    if (otp.pin !== vals.pin) {
      handleError('Pin Must Be Same');
      return;
    }

    if (values && token) {
      const {bvn, ...newValues} = values;
      const newValue = {...newValues, ...vals};
      submitForm(URLS.createBUSorIND, {user: newValue}, () => {
        navigation.navigate(DRAWER_NAVIGATOR.home);
      });
      return;
    }

    if (values && !token) {
      const newValue = {...values, ...vals};
      const body = {user: newValue};
      submitForm(URLS.createUser, removeEmptyValues(body.user), () => {
        navigation.replace(AUTH_NAVIGATOR.signupSuccess, {body});
      });
      return;
    }

    if (!values && otp) {
      const currentUserType =
        accountType === AccountType.INDIVIDUAL ? 'IND' : 'BUS';
      try {
        const response = await post(URLS.resetPin, {
          newPin: otp.pin,
          accountType: currentUserType,
        });
        if (response) {
          toggleLoading();
          toggleError();
          showToast('Pin Updated!');
          navigation.navigate(MAIN_NAVIGATOR.Drawer);
        }
      } catch (error: any) {
        handleError(error ? error : 'Failed');
      }
    }
  };

  /**
   * goBack
   * - Handles navigation when user goes back
   * - Redirects to the appropriate PIN creation or reset screen
   */
  const goBack = () => {
    if (values && !token) {
      navigation.navigate(AUTH_NAVIGATOR.createPin, {
        values,
        otp,
        title: CREATE_PIN_SCREEN.createPin,
        body: CREATE_PIN_SCREEN.desc,
      });
    } else if (values && token) {
      navigation.navigate(MAIN_NAVIGATOR.ResetPin, {
        values,
        otp: otp.pin,
        title: CREATE_PIN_SCREEN.createPin,
        body: CREATE_PIN_SCREEN.desc,
      });
    } else {
      navigation.navigate(MAIN_NAVIGATOR.ResetPin, {
        otp,
        title: RESET_PIN_SCREEN.Reset,
        body: RESET_PIN_SCREEN.desc,
      });
    }
  };

  /**
   * toggleError
   * - Toggles the error message visibility
   */
  const toggleError = () => {
    setShowError(prev => !prev);
  };

  /**
   * toggleLoading
   * - Toggles the loading state for button interactions
   */
  const toggleLoading = () => {
    setIsLoading(prev => !prev);
  };

  return (
    <>
      <Header
        isBackButton
        isLeftTitle
        title={CREATE_PIN_SCREEN.confirmPin}
        goBack={goBack}
        style={styles.header}
      />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{CREATE_PIN_SCREEN.confirmPinDesc}</Text>
        </View>
        <Form
          validationSchema={pinSchema}
          initialValues={{pin: ''}}
          onSubmit={handleSubmit}>
          <FormikTextInput name="pin" type="otp" length={4} />
          {showError && <Text style={styles.error}>{error}</Text>}
          <Button
            title={COMMON.next}
            style={styles.btn}
            type={ButtonT.submit}
            isLoading={isLoading}
          />
        </Form>
      </View>
    </>
  );
};

export default ConfirmPinScreen;
