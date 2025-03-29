import React, {useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import Papper from '@kp/components/common/Papper';
import Form from '@kp/components/common/form/Form';
import PATHS from '@kp/constants/paths';
import {COMMON, SECURITY_PLACEHOLDER} from '@kp/constants/appText';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import {AccountType, ButtonT} from '@kp/constants/enum';
import Button from '@kp/components/common/Button';
import styles from './styles';
import Header from '@kp/components/common/Header';
import LockIcon from '@kp/svgs/LockIcon';
import {useNavigation} from '@react-navigation/native';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import {patch, post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import {generateBodyForReset, showToast} from '@kp/utils/common';
import {otpSchema, pinSchema} from '@kp/validations/auth';
import {
  useLazyGetUserInfoQuery,
  useVerifyPinMutation,
} from '@kp/redux/service/users';
import {useAccountContext} from '@kp/context/accountType';
import COLOR from '@kp/constants/colors';
import {setUserInfo} from '@kp/redux/slices/userSlice';
import {useAppDispatch, useAppSelector} from '@kp/redux/slices';

/**
 * Reset
 * - Handles user reset actions such as changing phone number, password, or email
 * - Manages verification steps including PIN and OTP validation
 * - Utilizes API requests to update user information
 */
const Reset = ({route}: any) => {
  const {header, title, fields, type, key, validations} = route.params ?? {};
  const {navigate} = useNavigation<any>();
  const {accountType} = useAccountContext();
  const dispatch = useAppDispatch();
  const {info} = useAppSelector(state => state.user);
  const [getUserInfo] = useLazyGetUserInfoQuery();
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [verifyPin, {isLoading: isVerfiyLoading}] = useVerifyPinMutation();

  /**
   * handleSubmit
   * - Handles submission of reset actions (phone, password, or email)
   * - Sends API requests based on the provided values
   */
  const handleSubmit = async (val: any) => {
    const body = generateBodyForReset(val, info);
    if (val.newPhone) {
      try {
        setIsLoading(true);
        setShowError(false);
        const response = await post(URLS.verifyOtpForChangeNumber, body);
        if (response) {
          setIsOTPVerified(true);
          setPhoneNumber(body?.mobileNumber || '');
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        setShowError(true);
        error ? setError(error) : setError('failed');
      }
    } else if (val.newPassword) {
      try {
        if (val.newPassword !== val.confirmNewPassword) {
          setShowError(true);
          setError('Password is not the same.');
          return;
        }
        setIsLoading(true);
        setShowError(false);
        const response = await post(URLS.resetPassword, body);
        if (response) {
          setIsLoading(false);
          showToast('Password Changed');
        }
        navigate(MAIN_NAVIGATOR.Drawer);
      } catch (error: any) {
        setIsLoading(false);
        setShowError(true);
        error ? setError(error) : setError('failed');
      }
    } else {
      try {
        setIsLoading(true);
        setShowError(false);
        const response = await patch(URLS.createUser, {
          user: body,
        });
        if (response) {
          const data = await getUserInfo(null);
          dispatch(setUserInfo(data.data));
          navigate(MAIN_NAVIGATOR.Drawer);
          val.newEmail && showToast('Email Updated!');
        }
      } catch (error: any) {
        setIsLoading(false);
        setShowError(true);
        error ? setError(error) : setError('failed');
      }
    }
  };

  /**
   * submitPin
   * - Verifies user's PIN before proceeding with reset actions
   */
  const submitPin = async (val: any) => {
    const type = accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS';
    try {
      const payload = {
        pin: val.pin,
        accountType: type,
      };
      await verifyPin(payload).unwrap();
      setIsPinVerified(true);
    } catch (error: any) {
      console.log(error, 'errr');
      if ('data' in error) {
        Alert.alert(
          error.data?.message ? error.data?.message : COMMON.somethingWentWrong,
        );
      } else {
        Alert.alert(COMMON.somethingWentWrong);
      }
    }
  };

  /**
   * submitOtp
   * - Verifies the OTP sent to the user's phone number
   */
  const sumbitOtp = async (val: any) => {
    try {
      setIsLoading(true);
      setShowError(false);
      const body = {
        otp: val.otp,
        mobileNumber: phoneNumber,
      };
      const response = await post(URLS.changeUserPhoneNum, body);
      if (response) {
        setIsLoading(false);
        const data = await getUserInfo(null);
        dispatch(setUserInfo(data.data));
        navigate(MAIN_NAVIGATOR.Drawer);
        showToast('Phone Number Updated!');
      }
    } catch (error: any) {
      setIsLoading(false);
      setShowError(true);
      error ? setError(error) : setError('failed');
    }
  };

  const initialValues: {[key: string]: any} = {};

  fields?.forEach((name: any) => {
    initialValues[name] = '';
  });

  return (
    <View style={{flex: 1}}>
      {isPinVerified && !isOTPVerified ? (
        <>
          <Header isBackButton title={header} />
          <Papper style={styles.card}>
            <Image style={styles.logo} source={PATHS.blueLogo} />
            <Text style={styles.title}>{title}</Text>
            <Form
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validations ? validations : null}>
              {fields?.map((item: any) => (
                <>
                  {type == 'otp' && (
                    <Text style={styles.text}>
                      {SECURITY_PLACEHOLDER[item]}
                    </Text>
                  )}
                  <FormikTextInput
                    Icon={LockIcon}
                    name={item}
                    type={type}
                    length={4}
                    secureTextEntry={key ? true : false}
                    placeholder={SECURITY_PLACEHOLDER[item]}
                  />
                </>
              ))}
              {showError && <Text style={styles.error}>{error}</Text>}

              <Button
                style={styles.mt30}
                title="Continue"
                type={ButtonT.submit}
                isLoading={isLoading}
              />
            </Form>
          </Papper>
        </>
      ) : (
        !isOTPVerified && (
          <View style={{flex: 1, backgroundColor: COLOR.white}}>
            <Header
              isBackButton
              isLeftTitle
              title={'Verify Pin'}
              style={{height: 132, paddingTop: 50}}
            />
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{'Enter Your Current Pin'}</Text>
              </View>
              <Form
                validationSchema={pinSchema}
                initialValues={{pin: ''}}
                onSubmit={submitPin}>
                <FormikTextInput name="pin" type="otp" length={4} />
                <Button
                  title={COMMON.next}
                  style={styles.btn}
                  type={ButtonT.submit}
                  isLoading={isVerfiyLoading}
                />
              </Form>
            </View>
          </View>
        )
      )}
      {isOTPVerified && isPinVerified && (
        <View style={{flex: 1, backgroundColor: COLOR.white}}>
          <Header
            isBackButton
            isLeftTitle
            title={'Verify Otp'}
            style={{height: 132, paddingTop: 50}}
          />
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {'Enter the Otp sent on your number'}
              </Text>
            </View>
            <Form
              validationSchema={otpSchema}
              initialValues={{otp: ''}}
              onSubmit={sumbitOtp}>
              <FormikTextInput name="otp" type="otp" length={6} />
              {showError && <Text style={styles.error}>{error}</Text>}
              <Button
                title={COMMON.next}
                style={styles.btn}
                type={ButtonT.submit}
                isLoading={isLoading}
              />
            </Form>
          </View>
        </View>
      )}
    </View>
  );
};

export default Reset;
