import React, {useEffect, useState} from 'react';
import {Alert, KeyboardAvoidingView, Text, View} from 'react-native';
import {
  ACCOUNT_DETAILS,
  COMMON,
  CREATE_PIN_SCREEN,
  SIGNUP_SCREEN,
} from '@kp/constants/appText';
import Header from '@kp/components/common/Header';
import BottomContainer from '@kp/components/auth/BottomContainer';
import {AUTH_NAVIGATOR, MAIN_NAVIGATOR} from '@kp/constants/routes';
import SignupForm from '@kp/components/auth/signup/SignupForm';
import {ScreenProps} from '../../../@types/form';
import styles from './styles';
import {AccountType} from '@kp/constants/enum';
import {
  LoggedInBusinessFormFields,
  LoggedInIndividualFormFields,
  businessFormFields,
  individualFormFields,
} from '@kp/constants';
import BVNModal from '@kp/components/BVNModal';
import {post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import {useAppSelector} from '@kp/redux/slices';
import {useCheckFeildAvailableMutation} from '@kp/redux/service/users';
import {getSignUpSchema} from '@kp/utils/helper';

/**
 * Retrieves form fields based on account type, country, and login status.
 */
const getFormFields = (
  type: AccountType,
  country: string,
  isLoggedIn: boolean,
) => {
  if (type === AccountType.BUSINESS) {
    return isLoggedIn ? LoggedInIndividualFormFields : businessFormFields;
  }

  if (type === AccountType.INDIVIDUAL && country == 'US') {
    return isLoggedIn ? LoggedInBusinessFormFields : individualFormFields;
  }

  const _individualFormFields = JSON.parse(
    JSON.stringify(individualFormFields),
  );

  if (country == 'NG') {
    _individualFormFields[1] = [
      ..._individualFormFields[1],
      {
        name: 'bvn',
        label: 'BVN',
        placeholder: 'Enter Your BVN',
      },
    ];
  }

  return _individualFormFields;
};

/**
 * AccountDetailsScreen Component
 * - Manages user account creation and signup process
 * - Supports both logged-in and new users with conditional steps
 * - Handles BVN verification for Nigerian users
 * - Implements form validation, field availability checks, and navigation
 */

const AccountDetailsScreen = ({navigation, route}: ScreenProps) => {
  const {type, val, isLoggedIn} = route.params;
  const {token, info} = useAppSelector(state => state.user);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showBVNModal, setShowBVNModal] = useState(false);
  const [values, setValues] = useState({bvn: ''});
  const [methods, setMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const formFields = getFormFields(
    type,
    val?.mobileCountry ? val.mobileCountry : info.mobileCountry,
    isLoggedIn ? isLoggedIn : false,
  );
  const [checkFeildAvailable, {isLoading: isCheckFeildLoading}] =
    useCheckFeildAvailableMutation();

  useEffect(() => {
    if (!isLoggedIn) {
      setValues(val);
    }
  }, []);

  useEffect(() => {
    isLoggedIn ? loggedInSteps() : notLoggedInSteps();
  }, [values]);

  /**
   * Handles form submission and moves to the next step if valid.
   */
  const handleSubmit = (vals: any) => {
    if (!token) {
      if (step === 1) {
        if (vals.password && vals.password !== vals.confirmPassword) {
          Alert.alert("Password Doesn't Match");
          return;
        }
        const {confirmPassword, ...filteredVals} = vals;
        handleFeildAvailable(filteredVals, {email: vals.email});
      } else if (step === 2) {
        handleFeildAvailable(vals, {krillTag: vals.krillTag});
      } else if (step === 3) {
        setValues({...values, ...vals});
        setStep(prev => prev + 1);
      }
    } else {
      if (step == 1) {
        handleFeildAvailable(vals, {krillTag: vals.krillTag});
      } else {
        setValues({...values, ...vals});
        setStep(prev => prev + 1);
      }
    }
  };

  const toggleModal = () => {
    setShowBVNModal(prev => !prev);
  };

  /**
   * Manages steps for non-logged-in users.
   */
  const notLoggedInSteps = async () => {
    if (step === 1) {
      return;
    }

    if (step === 2 && val.mobileCountry == 'NG') {
      setStep(2);
      await initiateBVN(values.bvn);
      return;
    }

    if (step === 3) {
      setStep(3);
      navigation.navigate(AUTH_NAVIGATOR.createPin, {
        values,
        title: CREATE_PIN_SCREEN.createPin,
        body: CREATE_PIN_SCREEN.desc,
      });
    }
  };

  /**
   * Manages steps for logged-in users.
   */
  const loggedInSteps = () => {
    if (step === 2) {
      setStep(2);
      navigation.navigate(MAIN_NAVIGATOR.ResetPin, {
        values,
        title: CREATE_PIN_SCREEN.createPin,
        body: CREATE_PIN_SCREEN.desc,
      });
    }
  };

  /**
   * Initiates BVN verification process.
   */
  const initiateBVN = async (value: string) => {
    try {
      setIsLoading(true);
      setShowError(false);
      const response = await post(URLS.initiateBVN, {bvn: value});
      if (response?.data?.data) {
        if (response?.data?.data?.methods) {
          setMethods(response?.data?.data?.methods);
        }
        setSessionId(response?.data?.data?.session_id);
        setIsLoading(false);
        setShowError(false);
        toggleModal();
      } else {
        setShowError(true);
        setError(response?.data?.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      setShowError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles checking field availability before proceeding to the next step.
   */
  const handleFeildAvailable = async (vals: any, feild: object) => {
    try {
      await checkFeildAvailable(feild as FeildAvailable).unwrap();
      setValues({...values, ...vals});
      setStep(prev => prev + 1);
    } catch (error: any) {
      Alert.alert(
        error.data?.message ? error.data?.message : COMMON.somethingWentWrong,
      );
    }
  };
  const country = val?.mobileCountry ? val.mobileCountry : info.mobileCountry;
  const schema = getSignUpSchema(type, country, step, isLoggedIn);

  /**
   * Handles back navigation.
   */
  const handleGoBack = () => {
    if (step === 1) {
      return navigation.goBack();
    }
    setStep(prev => prev - 1);
  };

  const headerType = token
    ? type == AccountType.INDIVIDUAL
      ? AccountType.BUSINESS
      : AccountType.INDIVIDUAL
    : type;

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <View style={styles.container}>
        <BVNModal
          updateStep={setStep}
          sessionId={sessionId}
          methods={methods}
          modalVisible={showBVNModal}
          toggleModal={toggleModal}
        />
        <Header
          goBack={handleGoBack}
          title={ACCOUNT_DETAILS.titles[headerType][step]}
          isBackButton
          isLeftTitle
        />
        <View style={styles.stepContainer}>
          <Text style={styles.stepText}>
            Step {step} of {formFields.length}
          </Text>
        </View>
        <SignupForm
          values={values}
          onSubmit={handleSubmit}
          shouldLoad={isLoading || isCheckFeildLoading}
          shouldShowError={showError}
          bvnError={error}
          fields={formFields[step - 1]}
          validationSchema={schema}
          containerStyle={{paddingBottom: 80}}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AccountDetailsScreen;
