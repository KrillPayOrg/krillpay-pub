import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Pressable, View, Text} from 'react-native';
import styles from './styles';
import {ScreenProps} from '../../../@types/form';
import WebView from 'react-native-webview';
import {DRAWER_NAVIGATOR} from '@kp/constants/routes';
import {useAccountContext} from '@kp/context/accountType';
import {get} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import {AccountType} from '@kp/constants/enum';

const KYCVerfication = ({navigation, route}: ScreenProps) => {
  const webViewRef = useRef(null);
  const {accountType} = useAccountContext();
  const [url, setUrl] = useState({loading: true, data: null});
  const [goBack, setGoBack] = useState<boolean>(false); // For Nigeria Wallet Check

  /**
   * getUrl
   * - Fetches the KYC verification URL based on account type.
   * - Updates the state with the fetched URL or handles errors.
   */
  const getUrl = async () => {
    try {
      setUrl(prev => ({...prev, loading: true}));
      const type = accountType == AccountType.BUSINESS ? 'BUS' : 'IND';
      const response = await get(`${URLS.getKycUrl}?accountType=${type}`);
      console.log(response.data, 'data');
      if (response) {
        setUrl({loading: false, data: response.data.url});
      }
    } catch (error) {
      console.log(error, 'err');
      setUrl(prev => ({...prev, loading: false}));
      return error;
    }
  };

  useEffect(() => {
    getUrl();
  }, []);

  /**
   * handleWebViewMessage
   * - Handles messages received from the WebView.
   * - Redirects the user based on the message content.
   */
  const handleWebViewMessage = async (event: any) => {
    const message = event.nativeEvent.data;
    if (message === 'returnToNativeApp') {
      navigation.navigate(DRAWER_NAVIGATOR.home);
    } else if (message === 'updateStatus') {
      try {
        navigation.navigate(DRAWER_NAVIGATOR.home);
      } catch (error) {
        console.log(error);
      }
    } else if (message === 'PersonaCancelled') {
      navigation.navigate(DRAWER_NAVIGATOR.home);
    } else if (message) {
      const value = JSON.parse(message);
      if (value.action == 'passed' && value.topic == 'session') {
        navigation.navigate(DRAWER_NAVIGATOR.home);
      }
    }
  };
  return (
    <View style={styles.container}>
      {url.loading ? (
        <ActivityIndicator
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: 300,
          }}
          color="#044c8d"
          size={60}
        />
      ) : url.data ? (
        <WebView
          domStorageEnabled={true}
          javaScriptEnabled={true}
          startInLoadingState={true}
          ref={webViewRef}
          renderLoading={() => (
            <ActivityIndicator
              style={{
                position: 'absolute',
                alignSelf: 'center',
                marginTop: 300,
              }}
              color="#044c8d"
              size={60}
            />
          )}
          onMessage={handleWebViewMessage}
          source={{
            uri: url.data,
          }}
          style={{flex: 1}}
        />
      ) : (
        <ActivityIndicator
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: 300,
          }}
          color="#044c8d"
          size={60}
        />
      )}
      {goBack && (
        <View style={styles.goBackContainer}>
          <Pressable style={styles.goBack}>
            <Text style={{color: 'white'}}>Go Back</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default KYCVerfication;
