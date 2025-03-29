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
import {HTML_PAGES} from '@kp/constants/appText';
import COLOR from '@kp/constants/colors';
import {get} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
const {width} = Dimensions.get('screen');

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

const PolicyScreen = ({route}: ScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [htmlPage, setHtmlPage] = useState('');
  const {title} = route.params ?? {};

  const getUrl = async () => {
    try {
      setIsLoading(true);
      const response = await get(`${URLS.getHTMLPages}?name=${title}`);
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
  }, []);

  return (
    <>
      <Header
        isBackButton
        isLeftTitle
        title={HTML_PAGES[title]}
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

export default PolicyScreen;
