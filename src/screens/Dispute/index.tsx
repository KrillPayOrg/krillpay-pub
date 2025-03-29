import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';
import styles from './styles';
import {ScreenProps} from '../../../@types/form';
import RenderHtml from 'react-native-render-html';

import Header from '@kp/components/common/Header';
import COLOR from '@kp/constants/colors';
import {get} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
const {width} = Dimensions.get('screen');
import {useIsFocused} from '@react-navigation/native';

const contentHtmlStyles = StyleSheet.create({
  p: {
    color: COLOR.black,
  },
  h4: {
    color: COLOR.black,
  },
  h2: {
    color: COLOR.black,
  },
});

/**
 * Dispute Screen
 * - Fetches and displays dispute-related content in HTML format
 * - Uses RenderHtml to render dynamic HTML content
 * - Shows a loading indicator while fetching data
 */
const Dispute = ({route}: ScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [htmlPage, setHtmlPage] = useState('');
  const isFocused = useIsFocused();

  /**
   * getUrl
   * - Fetches dispute HTML content from the API
   * - Updates state with fetched HTML or handles errors
   */
  const getUrl = async () => {
    try {
      setIsLoading(true);
      const response = await get(`${URLS.getHTMLPages}?name=dispute`);
      if (response) {
        setIsLoading(false);
        setHtmlPage(response.data.htmlPage);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('er', error);
    }
  };

  useEffect(() => {
    getUrl();
  }, [isFocused]);

  return (
    <>
      <Header
        isBackButton
        isLeftTitle
        title={'Dispute'}
        style={styles.header}
      />
      <ScrollView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            style={{height: 200, width: 200, alignSelf: 'center'}}
            size="large"
          />
        ) : (
          <RenderHtml
            tagsStyles={contentHtmlStyles}
            contentWidth={width}
            source={{html: htmlPage ? htmlPage : ''}}
          />
        )}
      </ScrollView>
    </>
  );
};

export default Dispute;
