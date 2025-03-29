import React, {useState} from 'react';
import {KeyboardAvoidingView, View} from 'react-native';
import styles from './styles';
import {COMMON, LOGIN_SCREEN} from '@kp/constants/appText';
import Header from '@kp/components/common/Header';
import BottomContainer from '@kp/components/auth/BottomContainer';
import LoginForm from '@kp/components/auth/login/LoginForm';
import {ScreenProps} from '../../../@types/form';
import {AUTH_NAVIGATOR} from '@kp/constants/routes';
import {useCameraPermission} from 'react-native-vision-camera';
import {useAppSelector} from '@kp/redux/slices';

/**
 * LoginScreen Component
 * - Handles user login functionality
 * - Requests camera permission if not already granted
 * - Displays the login form and header
 */
const LoginScreen = ({navigation}: ScreenProps) => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [contacts, setContacts] = useState<any>();

  // const getContacts = async () => {
  //   if (Platform.OS === 'android') {
  //     const contactPermission = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //     );
  //     if (!contactPermission) {
  //       await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //         {
  //           title: 'Contacts',
  //           message: 'ContactsList app would like to access your contacts.',
  //           buttonPositive: 'Accept',
  //         },
  //       ).then(value => {
  //         if (value === 'granted') {
  //           Contacts.getAll().then(value => setContacts(value));
  //           return;
  //         }
  //       });
  //     }
  //   }
  //   Contacts.getAll().then(value => setContacts(value));
  // };

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission().then(() => {
        console.log('Granted');
      });
    }
    // getContacts();
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.container}>
        <Header style={styles.header} title={COMMON.krillPay} />
        <LoginForm />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
