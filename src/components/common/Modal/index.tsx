import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Button from '../Button';
import {COMMON} from '@kp/constants/appText';
import {AccountType, ButtonT, FieldType, dateType} from '@kp/constants/enum';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import Form from '@kp/components/common/form/Form';
import {useAccountContext} from '@kp/context/accountType';
import {useNavigation} from '@react-navigation/native';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import BVNModal from '@kp/components/BVNModal';
import {post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import {useAppSelector} from '@kp/redux/slices';

/**
 * PopUp Component
 * - Handles multiple modal types: Date Selection, BVN Verification, Account Switching, and Identity Verification.
 * - Uses `react-native-date-picker` for date selection.
 * - Integrates BVN verification through API calls.
 * - Manages different modal states via props.
 */
const PopUp = ({
  modalVisible,
  toggleModal,
  style,
  isDateModal = false,
  setEndDate,
  setStartDate,
  startDate,
  endDate,
  isBVN = false,
  toggleBVN,
  isVerificationModal = false,
}: ModalProps) => {
  const [dateOpen, setDateOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [type, setType] = useState<dateType>(dateType.start);
  const {accountType, setAccountType} = useAccountContext();
  const {navigate} = useNavigation<any>();
  const [showBVNModal, setShowBVNModal] = useState(false);
  const [methods, setMethods] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  const {info, businessProfile} = useAppSelector(state => state.user);
  /**
   * Toggles the Date Picker modal.
   */
  const toggleOpenDateModal = () => setDateOpen(prev => !prev);

  /**
   * Sets the selected date type and opens the date picker.
   */
  const handleTypeSelect = (type: dateType) => {
    setType(type);
    toggleOpenDateModal();
  };

  /**
   * Sets selected dates and closes the modal.
   */
  const generateButton = () => {
    setStartDate?.(moment(selectedStartDate).format('YYYY-MM-DD'));
    setEndDate?.(moment(selectedEndDate).format('YYYY-MM-DD'));
    toggleModal();
  };

  /**
   * Handles date selection from the Date Picker.
   */
  const handleDateSelect = (date: Date) => {
    if (type == dateType.start) {
      setSelectedStartDate(moment(date).format('YYYY-MM-DD'));
    } else {
      if (moment(date) < moment(selectedStartDate)) {
        setSelectedStartDate(moment(date).format('YYYY-MM-DD'));
      }
      setSelectedEndDate(moment(date).format('YYYY-MM-DD'));
    }
  };

  /**
   * Toggles the BVN Verification Modal.
   */
  const toggleBvnVerifyModal = () => {
    setShowBVNModal(prev => !prev);
  };

  /**
   * Handles BVN submission to the API.
   */
  const handleSubmit = async (vals: any) => {
    try {
      setIsLoading(true);
      setShowError(false);
      const response = await post(URLS.initiateBVN, vals);
      if (response) {
        setMethods(response.data.data.methods);
        setSessionId(response.data.data.session_id);
        setIsLoading(false);
        toggleModal();
        toggleBvnVerifyModal();
      }
    } catch (error: any) {
      setIsLoading(false);
      setShowError(true);
      setError(error);
    }
    //check BVN is correct
  };

  /**
   * Switches the user's account type (Individual or Business).
   */
  const switchAccount = (value: AccountType) => {
    if (accountType == value) {
      toggleModal();
      return;
    }
    setAccountType(value);
    toggleModal();
  };

  /**
   * Handles navigation to KYC verification.
   */
  const handleStarted = () => {
    toggleModal();
    navigate(MAIN_NAVIGATOR.KYCVerfication);
  };
  const date = type == dateType.start ? selectedStartDate : selectedEndDate;
  const maximumDate =
    type === dateType.end
      ? new Date()
      : new Date(selectedEndDate || Date.now());
  return (
    <SafeAreaView style={[style]}>
      <BVNModal
        sessionId={sessionId}
        methods={methods}
        modalVisible={showBVNModal}
        toggleModal={toggleBvnVerifyModal}
        toggleBVN={toggleBVN}
        accountCreated
      />
      <DatePicker
        modal
        mode={'date'}
        open={dateOpen}
        date={new Date(date ? date : Date.now())}
        onConfirm={handleDateSelect}
        onCancel={toggleOpenDateModal}
        maximumDate={maximumDate}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}>
        {!isDateModal && !isBVN && !isVerificationModal && (
          <TouchableOpacity onPress={toggleModal} style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => switchAccount(AccountType.INDIVIDUAL)}>
                <Text style={styles.modalText}>
                  {info?.firstName} {info?.lastName}
                </Text>
              </TouchableOpacity>
              <View style={styles.modalContainer} />
              <TouchableOpacity
                onPress={() => switchAccount(AccountType.BUSINESS)}>
                <Text style={styles.modalText}>
                  {businessProfile?.displayName}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        {isDateModal && (
          <View style={styles.centeredView}>
            <View style={[styles.dateModalView]}>
              <TouchableOpacity
                style={styles.backContainer}
                onPress={toggleModal}>
                <Image style={styles.backIcon} source={PATHS.close} />
              </TouchableOpacity>
              <Text style={styles.text}>{COMMON.fromDate}</Text>
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => handleTypeSelect(dateType.start)}>
                <Text style={styles.dateText}>{selectedStartDate}</Text>
                <Image style={styles.dateIcon} source={PATHS.calendar} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <Text style={styles.text}>{COMMON.toDate}</Text>
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={() => handleTypeSelect(dateType.end)}>
                <Text style={styles.dateText}>{selectedEndDate}</Text>
                <Image style={styles.dateIcon} source={PATHS.calendar} />
              </TouchableOpacity>
              <View style={styles.divider} />
              <Button
                onPress={generateButton}
                title={COMMON.generate}
                style={styles.generateButton}
              />
            </View>
          </View>
        )}
        {isBVN && (
          <View style={styles.centeredView}>
            <View style={styles.verificationModal}>
              <TouchableOpacity
                style={styles.backContainer}
                onPress={toggleModal}>
                <Image style={styles.backIcon} source={PATHS.close} />
              </TouchableOpacity>
              <Text style={styles.verificationHeading}>
                {COMMON.verificationBVNHeading}
              </Text>
              <Text style={styles.verificationText}>
                {COMMON.verificationTextOne}
              </Text>
              <Text style={styles.verificationText}>
                {COMMON.verificationTextTwo}
              </Text>
              <View style={styles.formView}>
                <Form
                  initialValues={{bvn: ''}}
                  onSubmit={handleSubmit}
                  validationSchema={null}>
                  <FormikTextInput type={FieldType.default} name="bvn" />
                  {showError && <Text style={styles.error}>{error}</Text>}
                  <Button
                    title="Submit"
                    type={ButtonT.submit}
                    isLoading={isLoading}
                  />
                </Form>
              </View>
            </View>
          </View>
        )}
        {isVerificationModal && (
          <View style={styles.centeredView}>
            <View
              style={[
                styles.verificationModal,
                styles.verificationModalHeight,
              ]}>
              <View style={styles.skipButton}>
                <Button
                  onPress={toggleModal}
                  title={COMMON.skip}
                  style={styles.skipButtonHeight}
                />
              </View>
              <Text style={styles.boldText}>{COMMON.identityVerification}</Text>
              <Text style={styles.regularText}>
                {COMMON.identityVerificationText}
              </Text>
              <Button
                onPress={handleStarted}
                title={COMMON.getStarted}
                style={styles.started}
              />
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default PopUp;
