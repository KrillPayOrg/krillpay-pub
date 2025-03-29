import Header from '@kp/components/common/Header';
import {CHANNEL_TYPE, COMMON} from '@kp/constants/appText';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {NavigationProp} from '@react-navigation/native';
import Button from '@kp/components/common/Button';
import Form from '@kp/components/common/form/Form';
import {ButtonT, FieldType} from '@kp/constants/enum';
import {useEffect, useState} from 'react';
import ChannelCard from '@kp/components/ChannelCard';
import FormSelectObject from '@kp/components/common/form/FormSelectObject';
import FormikTextInput from '@kp/components/common/form/FormikTextInput';
import FormSelect from '@kp/components/common/form/FormSelect';
import {BOTTOM_TAB_NAVIGATOR} from '@kp/constants/routes';
import {paymentReasons} from '@kp/constants';
import LoaderModal from '@kp/components/common/Modal/LoaderModal';
import {
  getAvailableChannels,
  getAvailableNetworks,
  initiateYellowTranscation,
} from '@kp/client/requests/yellowCard';
import React from 'react';

interface Props {
  navigation: NavigationProp<any>;
  route: any;
}

interface SelectedNetworkState {
  show: boolean;
  network?: Network;
}

interface SelectedBankState {
  show: boolean;
  bank?: Bank;
}

interface DestinationAccountName {
  show: boolean;
  value?: string;
}

/**
 * YellowCardFlow screen
 * - Handles the selection of payment channels and networks
 * - Allows users to enter bank details for transactions
 * - Initiates a transaction process based on user selection
 */
const YellowCardFlow: React.FC<Props> = ({navigation, route}) => {
  const initialValues: {[key: string]: any} = {};
  const {cash, rates, country} = route.params;
  const [availableNetworks, setAvailableNetworks] = useState<Network[]>([]);
  const [availableBanks, setAvailableBanks] = useState<Bank[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<SelectedNetworkState>({
    show: false,
    network: undefined,
  });
  const [selectedBank, setSelectedBank] = useState<SelectedBankState>({
    show: false,
    bank: undefined,
  });

  const [channelLoading, setChannelLoading] = useState(false);

  const [destinationAccountName, setDestinationAccountName] =
    useState<DestinationAccountName>({
      show: false,
      value: undefined,
    });

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    return () => {
      setChannelLoading(false);
    };
  }, []);

  /**
   * handleSubmit
   * - Fetches available channels based on the selected country
   * - Displays an error message if no channels are found
   */
  const handleSubmit = async () => {
    try {
      setChannelLoading(true);
      const data = await getAvailableChannels(country);
      setAvailableNetworks(data);
      setChannelLoading(false);
      if (data.length === 0) {
        Alert.alert(
          'Error',
          'No available Channels found. Please try again later.',
          [{text: 'OK', onPress: () => navigation.goBack()}],
        );
      }
    } catch (error: any) {
      setChannelLoading(false);
      console.error(error.message);
    }
  };

  /**
   * handleNetworkSelect
   * - Updates the selected network state when a user selects a network
   */
  const handleNetworkSelect = (network: Network) => {
    setSelectedNetwork({show: false, network: network});
  };

  /**
   * handleNetworkConfirmed
   * - Fetches available banks after a network is selected
   */
  const handleNetworkConfirmed = async () => {
    try {
      await getBanks();
    } catch (error) {
      console.log(error, 'error');
    }
  };

  /**
   * getBanks
   * - Fetches available banks for the selected network
   * - Displays an error message if no banks are found
   */
  const getBanks = async () => {
    try {
      const data = await getAvailableNetworks(
        country,
        selectedNetwork.network?.id,
      );
      setAvailableBanks(data);
      setSelectedNetwork(prev => ({
        ...prev,
        show: true,
      }));
      if (data.length === 0) {
        Alert.alert(
          'Error',
          'No available Banks found. Please try again later.',
          [{text: 'OK', onPress: () => navigation.goBack()}],
        );
      }
    } catch (error) {
      console.log(error, 'err');
    }
  };

  /**
   * handleBankSelect
   * - Initiates a transaction if account details are provided
   * - Retrieves account name if only an account number is entered
   */
  const handleBankSelect = async (value: any) => {
    if (destinationAccountName.show && selectedBank.show) {
      try {
        const data = {
          channel: selectedNetwork.network,
          network: selectedBank.bank,
          reason: value.reason,
          accountNumber: value.accountNumber,
          amount: cash,
          rate: rates[0],
          accountName: 'Test User',
        };
        const response = await initiateYellowTranscation(data);
        console.log(response);
        navigation.navigate(BOTTOM_TAB_NAVIGATOR.home);
      } catch (error) {
        console.log(error, 'errr');
      }
    } else if (selectedBank.show) {
      try {
        // const response = await get(
        //   `${URLS.getBankAccountName}?accountNumber=${value.accountNumber}&networkId=${selectedNetwork.network?.id}`,
        // );
        // console.log(response.data);
        setDestinationAccountName({
          show: true,
          value: 'Test User',
        });
      } catch (error) {
        console.log(error, 'error');
      }
    } else {
      setSelectedBank({show: true, bank: value.bankname});
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoaderModal modalVisible={channelLoading} />
      <Header
        title={COMMON.selectCountry}
        style={styles.header}
        isBackButton
        isLeftTitle
        goBack={goBack}
      />
      <View style={styles.subContainer}>
        <View style={styles.buttonContainer}>
          {availableNetworks &&
            availableNetworks.length > 0 &&
            !selectedNetwork.show && (
              <View>
                <Text style={styles.networkTitle}>Select a Network:</Text>
                {availableNetworks.map(network => (
                  <ChannelCard
                    key={network.id}
                    type={network.channelType}
                    title={CHANNEL_TYPE[network.channelType]}
                    isActive={selectedNetwork.network?.id === network.id}
                    onPress={handleNetworkSelect}
                    network={network}
                    id={network.id}
                  />
                ))}
                <Button
                  style={styles.mt20}
                  title={COMMON.continue}
                  type={ButtonT.default}
                  onPress={handleNetworkConfirmed}
                />
              </View>
            )}
          {selectedNetwork.show &&
            availableBanks &&
            availableBanks.length > 0 && (
              <Form
                initialValues={initialValues}
                onSubmit={handleBankSelect}
                validationSchema={null}>
                <FormSelectObject
                  name={'bankname'}
                  options={availableBanks}
                  label={'Select Bank Name'}
                  valueField="id"
                  labelField="name"
                  search
                />
                {selectedBank.show && (
                  <>
                    <FormikTextInput
                      label="Account Number"
                      type={FieldType.default}
                      name="accountNumber"
                      placeholder={'Enter Account Number'}
                    />
                    {destinationAccountName.show && (
                      <FormSelect
                        options={paymentReasons.options}
                        name={paymentReasons.name}
                        placeholder={paymentReasons.placeholder}
                      />
                    )}
                  </>
                )}
                <Button
                  style={styles.mt20}
                  title={COMMON.continue}
                  type={ButtonT.submit}
                />
              </Form>
            )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default YellowCardFlow;
