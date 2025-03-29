import React, {useRef, useState} from 'react';
import {
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Papper from '../common/Papper';
import styles from './styles';
import {post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import Button from '../common/Button';
import {BVN_TYPE, COMMON} from '@kp/constants/appText';
import MethodCard from './MethodCard';
import {ButtonT, MethodType} from '@kp/constants/enum';
import FormikTextInput from '../common/form/FormikTextInput';
import Form from '../common/form/Form';
import Input from 'react-native-phone-number-input';
import COLOR from '@kp/constants/colors';
import PATHS from '@kp/constants/paths';

const BVNModal: React.FC<BVNModal> = ({
  modalVisible,
  toggleModal,
  methods,
  sessionId,
  updateStep,
  accountCreated,
  toggleBVN,
}) => {
  const [step, setStep] = useState(1);
  const [methodType, setMethodType] = useState<MethodType>();
  const [isLoading, setIsLoading] = useState(false);
  const [bvnVerifyError, setBvnVerifyError] = useState(true);
  const [bvnVerifyErrorShow, setBvnVerifyErrorShow] = useState(false);
  const phoneInput = useRef<Input>(null);
  const [alternatePhone, setAlternatePhone] = useState('');
  // Handle BVN method selection
  const handleType = (type: MethodType) => {
    setBvnVerifyErrorShow(false);
    setMethodType(type);
  };
  // Handle form submission for OTP verification
  const handleStep = async () => {
    if (step == 1) {
      try {
        setIsLoading(true);
        setBvnVerifyErrorShow(false);
        const body =
          methodType == MethodType.alternate_phone
            ? {
                x_session_id: sessionId,
                method: methodType,
                phone_number: '234' + alternatePhone,
              }
            : {x_session_id: sessionId, method: methodType};
        const response = await post(URLS.verifyBVN, body);
        if (response) {
          setIsLoading(false);
          setStep(prev => prev + 1);
        }
      } catch (error: any) {
        setIsLoading(false);
        setBvnVerifyErrorShow(true);
        setBvnVerifyError(error);
      }
    }
  };
  // Close modal and reset state
  const closeModal = () => {
    setStep(1);
    setBvnVerifyErrorShow(false);
    toggleModal();
  };

  const handleSubmit = async (vals: any) => {
    if (step == 2) {
      try {
        setIsLoading(true);
        setBvnVerifyErrorShow(false);
        const url = accountCreated ? URLS.createNGNWallet : URLS.fetchBVN;
        const response = await post(url, {
          x_session_id: sessionId,
          otp: vals.otp,
        });
        if (response) {
          updateStep?.(3);
          setIsLoading(false);
          setStep(prev => prev - 1);
          toggleModal();
          accountCreated && toggleBVN?.();
        }
      } catch (error: any) {
        setIsLoading(false);
        setBvnVerifyErrorShow(true);
        setBvnVerifyError(error);
      }
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}>
      <View style={styles.container}>
        <Papper style={[styles.papper]}>
          <TouchableOpacity style={styles.backContainer} onPress={closeModal}>
            <Image style={styles.backIcon} source={PATHS.close} />
          </TouchableOpacity>
          {step == 1 && (
            <>
              {methods &&
                methods.map((item: any, index: number) => (
                  <>
                    <MethodCard
                      isActive={methodType === item.method}
                      type={item.method}
                      title={BVN_TYPE[item.method]}
                      text={item.hint}
                      onPress={() => handleType(item.method)}
                    />
                    {methodType == MethodType.alternate_phone &&
                      item.method == MethodType.alternate_phone && (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Input
                            ref={phoneInput}
                            onChangeText={(text: string) => {
                              setAlternatePhone(text);
                            }}
                            countryPickerProps={{
                              countryCodes: ['NG'],
                            }}
                            flagButtonStyle={{
                              backgroundColor: COLOR.border,
                              borderTopLeftRadius: 25,
                              borderBottomLeftRadius: 25,
                              height: 50,
                            }}
                            textInputProps={{placeholderTextColor: COLOR.gray}}
                            codeTextStyle={{
                              height: Platform.OS === 'android' ? 23 : 18.5,
                            }}
                            textInputStyle={styles.textNum}
                            textContainerStyle={styles.textContainer}
                            containerStyle={styles.numContainer}
                            placeholder={'Phone Number'}
                            defaultCode={'NG'}
                            value={alternatePhone}
                          />
                        </View>
                      )}
                  </>
                ))}
            </>
          )}
          {step == 2 && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Form
                validationSchema={null}
                initialValues={{otp: ''}}
                onSubmit={handleSubmit}>
                <FormikTextInput
                  name="otp"
                  label="Enter the OTP"
                  type="otp"
                  length={6}
                />
                {methodType == MethodType.alternate_phone && (
                  <FormikTextInput
                    name="phone"
                    label="Enter the Phone"
                    type="phone"
                  />
                )}
                <Button
                  type={ButtonT.submit}
                  style={styles.btn}
                  isLoading={isLoading}
                  title={COMMON.verify}
                />
              </Form>
            </View>
          )}
          {bvnVerifyErrorShow && (
            <Text style={styles.error}>{bvnVerifyError}</Text>
          )}
          {step == 1 && (
            <Button
              title={COMMON.continue}
              isLoading={isLoading}
              onPress={handleStep}
            />
          )}
        </Papper>
      </View>
    </Modal>
  );
};

export default BVNModal;
