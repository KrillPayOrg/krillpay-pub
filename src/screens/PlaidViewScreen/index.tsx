import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';

import {
  LinkExit,
  LinkEvent,
  LinkLogLevel,
  LinkSuccess,
  dismissLink,
  LinkOpenProps,
  usePlaidEmitter,
  LinkIOSPresentationStyle,
  LinkTokenConfiguration,
} from 'react-native-plaid-link-sdk';

import {create, open} from 'react-native-plaid-link-sdk/dist/PlaidLink';
import {deleteAPI, get, post} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';
import Header from '@kp/components/common/Header';
import {PiggyBankIcon, RefreshCcwIcon, TrashIcon} from 'lucide-react-native';
import Button from '@kp/components/common/Button';
import Papper from '@kp/components/common/Papper';
import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import {useGetExternalBanksQuery} from '@kp/redux/service/us';
import {useNavigation} from '@react-navigation/native';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import {useAppSelector} from '@kp/redux/slices';
import {useWalletContext} from '@kp/context/walletType';
import LoaderModal from '@kp/components/common/Modal/LoaderModal';
import {
  getWalletBalance,
  getWalletCashInDefaultCurrency,
  truncateWithEllipsis,
} from '@kp/utils/helper';
import FONT_FAMILY from '@kp/constants/fonts';

/**
 * isValidString
 * - Checks if a given string is valid (not empty or whitespace only)
 * - Returns a boolean indicating validity
 */
function isValidString(str: string): boolean {
  if (str && str.trim() !== '') {
    return true;
  }
  return false;
}

/**
 * PlaidLinkScreen Component
 * - Manages external bank linking via Plaid
 * - Handles account verification, deletion, and navigation
 * - Displays and interacts with external bank accounts
 */
export function PlaidLinkScreen({route}: any) {
  const {type} = route.params || {};
  const {accountType} = useAccountContext();
  const {navigate, goBack} = useNavigation<any>();
  const {userWallets, walletBalances}: any = useAppSelector(
    state => state.user,
  );
  const {wallet} = useWalletContext();
  const accType = accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS';
  const {
    data,
    isLoading: loadingExternalBank,
    refetch,
    isFetching,
  } = useGetExternalBanksQuery({
    accountType: accType,
    page: 0,
    per_page: 10,
  } as any);
  const [tokenText, setTokenText] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [isVerifying, setIsVerifying] = React.useState({
    isLoading: false,
    activeIndex: 0,
  });
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [externalBankList, setExternalBankList] = React.useState<any>(null);
  const accTypeLowerCase = accType.toLocaleLowerCase();
  const index = userWallets?.[accTypeLowerCase]?.findIndex(
    (eachWallet: any) => eachWallet.walletCurrency === wallet,
  );

  // // Use event emitter to get real time events during a Link Session.
  usePlaidEmitter((event: LinkEvent) => {
    // Log Link Session events to console.
    console.log(event);
    if (event) {
      console.log(event.eventName, 'Eventt==');
    }
  });

  useEffect(() => {
    if (data && !loadingExternalBank && !isFetching) {
      setExternalBankList(data.objects);
    }
  }, [data, loadingExternalBank, isFetching]);

  useEffect(() => {
    if (tokenText) {
      if (isValidString(tokenText)) {
        const tokenConfiguration = createLinkTokenConfiguration(tokenText);
        create(tokenConfiguration);
        setDisabled(false);
      }
    }
  }, [tokenText]);

  useEffect(() => {
    return () => {
      setIsDeleting(false);
    };
  }, []);

  /**
   * createLinkTokenConfiguration
   * - Generates a Plaid link token configuration object
   * - Accepts a token and an optional noLoadingState flag
   */
  function createLinkTokenConfiguration(
    token: string,
    noLoadingState: boolean = false,
  ): LinkTokenConfiguration {
    return {
      token: token,
      // Hides native activity indicator if true.
      noLoadingState: noLoadingState,
    };
  }

  /**
   * createLinkOpenProps
   * - Configures and returns Plaid link opening properties
   * - Handles success and exit events
   */
  function createLinkOpenProps(): LinkOpenProps {
    return {
      onSuccess: async (success: LinkSuccess) => {
        // User was able to successfully link their account.
        if (success.metadata.metadataJson) {
          const json = JSON.parse(success.metadata.metadataJson);
          const body = {
            name: json.account.name,
            plaid_public_token: json.public_token,
            plaid_account_id: json.account.id,
            accountType: accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS',
          };
          try {
            const response = await post(URLS.addExternalBank, body);
            getLinkToken();
            if (response) {
              setTimeout(() => {
                refetch();
              }, 3000);
            }
          } catch (error: any) {
            getLinkToken();
            Alert.alert(error);
          }
        }
      },
      onExit: (linkExit: LinkExit) => {
        // User exited Link session. There may or may not be an error depending on what occured.
        getLinkToken();
        dismissLink();
      },
      // MODAL or FULL_SCREEEN presentation on iOS. Defaults to MODAL.
      iOSPresentationStyle: LinkIOSPresentationStyle.MODAL,
      logLevel: LinkLogLevel.ERROR,
    };
  }

  /**
   * verifyBankAccount
   * - Initiates verification of an external bank account
   * - Updates the verification state and triggers an API request
   * - Refetches data upon successful verification or handles errors
   */
  const verifyBankAccount = async (item: any, index: any) => {
    try {
      setIsVerifying({isLoading: true, activeIndex: index});
      const body = {
        accountType: accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS',
        external_bank_account_guid: item.guid,
      };
      await post(URLS.verifyExternalBank, body);
      setTimeout(() => {
        refetch();
        setIsVerifying({isLoading: false, activeIndex: index});
      }, 3000);
    } catch (error) {
      Alert.alert(`Verification Failed: ${error}`);
      setIsVerifying({isLoading: false, activeIndex: index});
    }
  };

  /**
   * onAccountPress
   * - Handles the press event for an external bank account
   * - Navigates to the external bank transfer screen if conditions are met
   * - Displays an alert if the balance is insufficient
   */
  const onAccountPress = async (item: any) => {
    const sourceWalletId =
      userWallets?.[accTypeLowerCase]?.[index ? index : 0]?.id;
    const profileType = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';
    console.log(item, 'itemm');
    const balance = getWalletCashInDefaultCurrency(
      walletBalances,
      profileType,
      wallet,
    );
    if (type == 'addMoney' || parseFloat(balance) > 0) {
      navigate(MAIN_NAVIGATOR.ExternalBankTransferScreen, {
        title: type == 'addMoney' ? 'Deposit' : 'Withdraw',
        externalBank: item,
        sourceWalletId: sourceWalletId,
        balance: balance,
      });
    } else {
      Alert.alert('Insufficient Balance');
    }
  };

  /**
   * deleteExternalBank
   * - Deletes an external bank account based on the provided item
   * - Updates the UI state and refreshes the external bank list after deletion
   * - Displays an error alert if the deletion fails
   */
  const deleteExternalBank = async (item: any, index: any) => {
    console.log(item, 'item');
    try {
      setIsDeleting(true);
      const accType = accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS';
      const response = await deleteAPI(
        `${URLS.deleteExternalBank}/${accType}/${item.guid}`,
      );
      if (response) {
        setTimeout(() => {
          refetch();
          setIsDeleting(false);
        }, 1000);
      }
    } catch (error) {
      Alert.alert(`Error: ${error ? error : 'Something Went Wrong!'}`);
      setIsDeleting(false);
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={{
          width: '80%',
          paddingHorizontal: 14,
          paddingVertical: 12,
          marginTop: 12,
          borderWidth: 1,
          alignSelf: 'center',
          borderColor: colorWithOpacity(COLOR.black, 20),
          borderRadius: 20,
        }}
        disabled={item.state !== 'completed'}
        onPress={() => onAccountPress(item)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text numberOfLines={1} style={styles.textExternalTitle}>
                {truncateWithEllipsis(item.name, 15)}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: item.state !== 'completed' ? '25%' : 'auto',
                }}>
                {item.state !== 'completed' && (
                  <View>
                    {isVerifying.isLoading &&
                    isVerifying.activeIndex == index ? (
                      <ActivityIndicator color={COLOR.primary} size={'small'} />
                    ) : (
                      <TouchableOpacity
                        onPress={() => verifyBankAccount(item, index)}
                        style={{alignSelf: 'center', marginLeft: 4}}>
                        <RefreshCcwIcon
                          size={24}
                          color={colorWithOpacity(COLOR.primary, 0.7)}
                          strokeWidth={2}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {!isDeleting && (
                  <TrashIcon
                    size={24}
                    color={COLOR.red}
                    style={{marginLeft: 8}}
                    onPress={() => {
                      Alert.alert(
                        'Confirm Action',
                        `Are you sure you want to remove ${item.name} bank?`,
                        [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancelled'),
                            style: 'cancel',
                          },
                          {
                            text: 'Confirm',
                            onPress: () => deleteExternalBank(item, index),
                          },
                        ],
                        {cancelable: true},
                      );
                    }}
                  />
                )}
              </View>
            </View>
            <Text style={styles.textExternal}>{item.plaid_account_mask}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
              }}>
              <Text style={styles.textExternal}>
                <Text
                  style={{
                    color: item.state == 'completed' ? 'green' : 'red',
                    fontStyle: 'italic',
                  }}>
                  {item.state == 'completed' ? 'Verified ' : 'Unverified '}
                </Text>
              </Text>
              <Text
                style={[
                  styles.textExternal,
                  {fontFamily: FONT_FAMILY.interBold},
                ]}>
                {item.asset}
              </Text>
            </View>
          </View>

          {/* <Text style={styles.textExternal}>{item.asset}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  const getLinkToken = async () => {
    try {
      setIsLoading(true);
      const type = accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS';
      const platform = Platform.OS;
      const response = await get(
        `${URLS.plaidWorkflow}?accountType=${type}&platform=${platform}`,
      );
      let result = response.data.plaid_link_token;
      while (!result) {
        result = await get(`${URLS.plaidLinkToken}?guid=${response.data.guid}`);
        setTokenText(result.data.plaid_link_token);
      }
      setTokenText(response.data.plaid_link_token);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLinkToken();
  }, []);

  return (
    <>
      <View style={{flex: 1, backgroundColor: COLOR.white}}>
        <Header
          style={styles.header}
          title={type == 'addMoney' ? 'Add Money' : 'Cash Out'}
          isLeftTitle
          isBackButton
        />
        <Papper style={styles.card}>
          <Text style={styles.text}>
            {externalBankList?.length > 0 ? '' : 'No External Bank'}
          </Text>
        </Papper>
        <View style={{flex: 1}}>
          {isFetching || loadingExternalBank ? (
            <ActivityIndicator color={COLOR.primaryLight} size="large" />
          ) : (
            <FlatList
              data={externalBankList}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          )}
        </View>
        <View style={{marginBottom: 24}}>
          <Button
            width={'80%'}
            onPress={() => {
              const openProps = createLinkOpenProps();
              open(openProps);
              setDisabled(true);
            }}
            style={styles.button}
            title={'Add A Bank'}
            isLoading={isLoading || disabled}
            disabled={disabled}
          />
          <LoaderModal modalVisible={isLoading || isDeleting} />
        </View>
      </View>
    </>
  );
}
