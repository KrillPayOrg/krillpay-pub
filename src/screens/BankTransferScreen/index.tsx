import Header from '@kp/components/common/Header';
import {COMMON} from '@kp/constants/appText';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {NavigationProp} from '@react-navigation/native';
import Papper from '@kp/components/common/Papper';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import {ButtonT} from '@kp/constants/enum';
import Button from '@kp/components/common/Button';
import Form from '@kp/components/common/form/Form';
import {useState} from 'react';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import {useWalletContext} from '@kp/context/walletType';
import {
  useGetAccountMutation,
  useGetNGNBankListQuery,
} from '@kp/redux/service/ngn';
import FormSelectObject from '@kp/components/common/form/FormSelectObject';
interface Props {
  navigation: NavigationProp<any>;
  route: any;
}

/**
 * BankTransferScreen Component
 * - Handles bank transfers by verifying account details
 * - Uses Formik for form handling
 * - Integrates with API to fetch bank details
 */
const BankTransferScreen = ({navigation, route}: Props) => {
  const {cash} = route.params;
  const [information, setInformation] = useState(false);
  const [verifyAccount, setVerifyAccount] = useState(false);
  const [bankName, setBankName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [accountNum, setAccountNum] = useState();
  const [accountHolder, setAccoutHolder] = useState('');
  const {data, isLoading} = useGetNGNBankListQuery();
  const [getAccount, {isLoading: isAccountLoading}] = useGetAccountMutation();

  /**
   * Handles navigation back logic
   * - Manages different states to determine correct back navigation
   */
  const goBack = () => {
    if (verifyAccount && information) {
      setVerifyAccount(false);
      setInformation(false);
    } else if (verifyAccount) {
      setVerifyAccount(false);
    } else if (information) {
      setInformation(false);
    } else {
      navigation.goBack();
    }
  };

  /**
   * Handles form submission
   * - Verifies bank account details using API
   * - Updates state based on verification response
   * @param {object} value - Form values containing bank details
   */
  const handleSubmit = async (value: any) => {
    try {
      if (value?.bankname && value?.accountNumber) {
        const payload = {
          bank_code: value.bankname.bankCode,
          account_number: value?.accountNumber,
        };
        const accountHolder = await getAccount(payload);
        if ('data' in accountHolder) {
          setAccoutHolder(accountHolder.data.accountName);
          setAccountNum(accountHolder.data.accountNumber);
          setBankName(value?.bankname?.bankName);
          setBankCode(value?.bankname?.bankCode);
          setVerifyAccount(true);
        }
      } else {
        Alert.alert('Select bank or enter account No');
      }
    } catch (err) {
      console.log('error while fetching account holder: ', err);
    }
  };

  /**
   * Navigates to the review screen with transaction details
   */
  const onPress = () => {
    navigation.navigate(MAIN_NAVIGATOR.Review, {
      bankTransaction: true,
      cash: cash,
      bankName: bankName,
      accountNum: accountNum,
      accountHolder: accountHolder,
      bankCode: bankCode,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={information ? COMMON.sendMoney : COMMON.bankDetails}
        style={styles.header}
        isBackButton
        isLeftTitle
        goBack={goBack}
      />
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          {information ? COMMON.verifyAmount : COMMON.recipientTextFill}
        </Text>
        <Papper style={styles.card}>
          {!information && (
            <Form
              initialValues={{
                bankname: '',
                accountNumber: '',
              }}
              onSubmit={handleSubmit}
              validationSchema={null}>
              <FormSelectObject
                name={'bankname'}
                options={data?.banks ?? []}
                label={'Select Bank Name'}
                valueField="bankName"
                labelField="bankName"
                disable={verifyAccount ? true : false}
                search
              />
              <FormikTextInput
                maxLength={24}
                label="Account Number"
                name="accountNumber"
                editable={verifyAccount ? false : true}
              />
              {verifyAccount && (
                <FormikTextInput
                  maxLength={24}
                  label="Account Holder"
                  name="accountHolder"
                  editable={false}
                  value={accountHolder}
                />
              )}
              {!verifyAccount && (
                <Button
                  style={styles.btn}
                  title={COMMON.verify}
                  type={ButtonT.submit}
                  isLoading={isLoading || isAccountLoading}
                />
              )}
            </Form>
          )}
          {verifyAccount && (
            <Button
              onPress={onPress}
              style={styles.button}
              title={COMMON.continue}
              type={ButtonT.default}
            />
          )}
        </Papper>
      </View>
    </SafeAreaView>
  );
};

export default BankTransferScreen;
