import React, {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Papper from '@kp/components/common/Papper';
import Form from '@kp/components/common/form/Form';
import {COMMON, PrivacyURL, SIGNUP_SCREEN} from '@kp/constants/appText';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import {ButtonT} from '@kp/constants/enum';
import Button from '@kp/components/common/Button';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import Checkbox from '@kp/components/common/Checkbox';
import FormSelect from '@kp/components/common/form/FormSelect';
import {setMobileNumber} from '@kp/utils/login';
import {post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import CountrySelect from '@kp/components/common/form/CountrySelect';
import {
  useGetCitiesFromStateMutation,
  useGetCountriesListQuery,
  useGetStatesFromCountryMutation,
} from '@kp/redux/service/users';
import LoaderModal from '@kp/components/common/Modal/LoaderModal';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import BottomContainer from '../../BottomContainer';
import {useAppSelector} from '@kp/redux/slices';

/**
 * Renders a customizable signup form component.
 * - Displays an icon, input fields, and submission button.
 * - Handles validation, privacy options, and navigation.
 */
const SignupForm: React.FC<SignupForm> = ({
  Icon,
  fields,
  validationSchema,
  isPrivacy,
  title,
  btnTitle,
  onSubmit,
  shouldLoad,
  shouldShowError,
  bvnError,
  values,
  containerStyle,
}) => {
  const {navigate} = useNavigation<any>();
  const {height} = useWindowDimensions();
  const {token} = useAppSelector(state => state.user);
  const {data: countryList, isLoading: isCountryLoading} =
    useGetCountriesListQuery();
  const [getStatesFromCountry, {isLoading: isStateLoading}] =
    useGetStatesFromCountryMutation();
  const [getCitiesFromState, {isLoading: isCityLoading}] =
    useGetCitiesFromStateMutation();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [term, setTerm] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDropDown, setSelectedDropDown] = useState<any>();

  /**
   * Re-renders the dropdown when the selected option changes.
   * - Triggers the renderDropDown function on update.
   */
  useEffect(() => {
    renderDropDown();
  }, [selectedDropDown]);

  /**
   * Updates the countries list when country loading completes.
   * - Sets the countries state if loading is false.
   */
  useEffect(() => {
    if (!isCountryLoading) {
      setCountries(countryList.country);
    }
  }, [isCountryLoading]);

  /**
   * Renders dropdown options based on the selected value.
   * - Fetches states or cities depending on the dropdown type.
   * - Updates state with fetched data or logs errors on failure.
   */
  const renderDropDown = async () => {
    try {
      if (selectedDropDown !== undefined) {
        if ('item' in selectedDropDown) {
          const {name, item} = selectedDropDown;
          if (name === 'country') {
            setStates([]);
            setCities([]);
            const response = await getStatesFromCountry({
              countryCode: item.isoCode,
            }).unwrap();
            setStates(response?.states);
          }
          if (name === 'state') {
            const payload = {
              countryCode: item.countryCode,
              stateCode: item.isoCode,
            };
            setCities([]);
            const response = await getCitiesFromState(payload).unwrap();
            setCities(response?.cities);
          }
        }
      }
    } catch (error) {
      console.log('error in selectedDropDown: ', error);
    }
  };

  /**
   * Handles submission of the signup form.
   * - Formats mobile number and checks terms acceptance if privacy is enabled.
   * - Calls custom onSubmit or verifies phone via API, then navigates to OTP screen.
   * - Manages loading and error states based on outcome.
   */
  const handleSubmit = async (val: any) => {
    const mobileNum = setMobileNumber(val.mobileCountry, val.mobileNumber);
    if (term || !isPrivacy) {
      if (onSubmit) {
        return onSubmit(val, setShowError, setIsLoading, setError);
      }
      try {
        setIsLoading(true);
        const response = await post(URLS.verifyPhone, {
          mobileNumber: mobileNum,
        });
        if (response) {
          setIsLoading(false);
          navigate(AUTH_NAVIGATOR.verifyAuthOtp, {
            mobileNumber: mobileNum,
            mobileCountry: val.mobileCountry,
          });
        }
      } catch (error: any) {
        setIsLoading(false);
        setShowError(true);
        setError(`Error: ${error || 'Server Failure'}`);
      }
    } else if (isPrivacy && !term) {
      setError('You Must Agree To Terms And Condition Before You Can Continue');
      setShowError(true);
    }
  };

  /**
   * Initializes an object with default values for form fields.
   * - Iterates through the provided `fields` array to extract field names.
   * - Assigns values from `values` if available; otherwise, leaves them undefined.
   */
  const initialValues: {[key: string]: any} = {};
  fields?.forEach(({name}) => {
    initialValues[name] = values?.[name];
  });

  /**
   * Navigates to a specific screen by opening a corresponding URL.
   * - Retrieves the URL from the `PrivacyURL` object using the provided `screen` key.
   * - Checks if the URL can be opened using `Linking.canOpenURL`.
   * - If supported, opens the URL; otherwise, shows an alert with an error message.
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
  // This styling is to handle the the title and papper space when device height
  // is 942 or more and number of fields are more than 6
  const extendedStyle =
    (fields?.length || 0) >= 6 || fields?.some(item => item.isSelect)
      ? {height: height > 922 ? 650 : 561, top: 150}
      : {};

  /**
   * Handles the selection of dropdown options based on the provided type.
   * - Returns the corresponding list of options (`countries`, `states`, or `cities`)
   *   based on the `dropdownType` value.
   * - Supports three types: 'country', 'state', and 'city'.
   */
  const handleDropDown = (dropdownType: any) => {
    switch (dropdownType) {
      case 'country':
        return countries;
      case 'state':
        return states;
      case 'city':
        return cities;
    }
  };

  /**
   * Determines the visibility of the dropdown icon based on the provided type.
   * - Checks if the respective list (`countries`, `states`, or `cities`) has items.
   * - If the list is empty, returns `true` (icon should be visible).
   * - If the list has items, returns `false` (icon should be hidden).
   */
  const handleDropdownIconVisibility = (dropdownType: any) => {
    switch (dropdownType) {
      case 'country':
        if (countries.length > 0) {
          return false;
        } else {
          return true;
        }
      case 'state':
        if (states.length > 0) {
          return false;
        } else {
          return true;
        }
      case 'city':
        if (cities.length > 0) {
          return false;
        } else {
          return true;
        }
    }
  };

  return (
    //If title & icon will not present then added padding top 40 to add some
    //white space on top to make UI accurate
    <Papper
      style={{
        ...styles.card,
        ...((!title && styles.pt40) || {}),
        ...((fields?.length || 0) <= 5
          ? {height: height <= 800 ? 500 : 600, top: 150}
          : {}),
        ...extendedStyle,
      }}>
      <ScrollView
        contentContainerStyle={[{paddingBottom: 25}, containerStyle]}
        overScrollMode="always"
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* If Icon present it will display otherwise it will hide */}
          {Icon && (
            <View style={styles.iconContainer}>
              <Icon />
            </View>
          )}
          {/* If title present it will display otherwise it will hide */}
          {title && <Text style={styles.title}>{SIGNUP_SCREEN.title}</Text>}
          <Form
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>
            {fields?.map(item => {
              if (item.isSelect && item.options) {
                return (
                  <FormSelect
                    key={item.name}
                    name={item.name}
                    options={item.options}
                    label={item.label}
                    placeholder={`Select ${item.placeholder}`}
                  />
                );
              }

              if (item.isGoogle) {
                return (
                  <>
                    <View style={styles.labelContainer}>
                      <Text style={styles.label}>{'Google Auto complete'}</Text>
                    </View>
                    <GooglePlacesAutocomplete
                      placeholder="Enter Location"
                      minLength={2}
                      fetchDetails={true}
                      textInputProps={{
                        placeholderTextColor: colorWithOpacity(
                          COLOR.medium,
                          30,
                        ),
                      }}
                      query={{
                        key: 'YOUR API KEY',
                        language: 'en',
                      }}
                      styles={{
                        textInputContainer: styles.textInputContainer,
                        textInput: styles.textInput,
                      }}
                    />
                  </>
                );
              }

              if (item.isDropdown) {
                return (
                  <CountrySelect
                    key={item.name}
                    name={item.name}
                    options={handleDropDown(item.dropDownType)}
                    label={item.label}
                    disable={handleDropdownIconVisibility(item.dropDownType)}
                    placeholder={`Select ${item.label}`}
                    setSelectedDropDown={setSelectedDropDown}
                  />
                );
              }

              return (
                <FormikTextInput
                  key={item.name}
                  isInfo={item.isInfo}
                  isTextArea={item.isTextArea}
                  label={item.label}
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  secureTextEntry={item.secureTextEntry}
                />
              );
            })}

            {shouldShowError && <Text style={styles.error}>{bvnError}</Text>}
            {showError && <Text style={styles.error}>{error}</Text>}
            {isPrivacy && (
              <View style={styles.termsContainer}>
                <Checkbox
                  term={term}
                  setTerm={setTerm}
                  setShowError={setShowError}
                  setError={setError}
                />
                <Text style={styles.termsText}>
                  {SIGNUP_SCREEN.privacy.byChecking}
                  <Text
                    onPress={() => navigateTo('termsConditions')}
                    style={styles.termsHilight}>
                    {SIGNUP_SCREEN.privacy.terms}
                  </Text>{' '}
                  {SIGNUP_SCREEN.privacy.and}{' '}
                  <Text
                    onPress={() => navigateTo('privacyPolicy')}
                    style={styles.termsHilight}>
                    {SIGNUP_SCREEN.privacy.policy}
                  </Text>
                  {SIGNUP_SCREEN.privacy.partnerCybrid}{' '}
                  <Text
                    onPress={() => navigateTo('userAgreement')}
                    style={styles.termsHilight}>
                    {SIGNUP_SCREEN.privacy.userAgree}
                  </Text>{' '}
                  {SIGNUP_SCREEN.privacy.and}{' '}
                  <Text
                    onPress={() => navigateTo('partnerPrivacyPolicy')}
                    style={styles.termsHilight}>
                    {SIGNUP_SCREEN.privacy.policy}
                  </Text>
                </Text>
              </View>
            )}
            <Button
              style={styles.mt40}
              title={btnTitle || COMMON.continue}
              type={ButtonT.submit}
              isLoading={isLoading || shouldLoad}
            />
          </Form>
        </View>
      </ScrollView>
      {token == null && (
        <BottomContainer
          style={styles.bottomContainer}
          title={SIGNUP_SCREEN.alreadyHaveAccount}
          btnText={SIGNUP_SCREEN.loginHere}
          onPress={() => navigate(AUTH_NAVIGATOR.login)}
        />
      )}
      <LoaderModal modalVisible={isStateLoading || isCityLoading} />
    </Papper>
  );
};

export default SignupForm;
