import React, {useState} from 'react';
import {View, TouchableOpacity, useWindowDimensions} from 'react-native';
import styles from './style';

import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import TabIcon from './TabBarItems/index';
import {
  BOTTOM_TAB_NAVIGATOR,
  DRAWER_NAVIGATOR,
  MAIN_NAVIGATOR,
} from '@kp/constants/routes';
import {useNavigation} from '@react-navigation/native';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';
import {useAppSelector} from '@kp/redux/slices';
import PopUp from '../Modal';
import {get} from '@kp/client/services/api';
import {URLS} from '@kp/constants/api';
import InProcessKYC from '../Modal/InProcessKyc';
import {CARD_TYPE, COMMON} from '@kp/constants/appText';
import {useWalletContext} from '@kp/context/walletType';
import {getWalletByCurrencyAndProfile} from '@kp/utils/helper';
import {isUserRejected, isUserVerified} from '@kp/utils/common';

/**
 * Custom Bottom TabBar Component
 * - Renders navigation tabs dynamically
 * - Handles wallet verification and navigation restrictions
 * - Displays modal popups for KYC verification status
 */
function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {individualProfile, businessProfile, userWallets} = useAppSelector(
    state => state.user,
  );
  const {accountType} = useAccountContext();
  const {wallet} = useWalletContext();
  const [text, setText] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showVerificationModalInProgress, setShowVerificationModalInProgress] =
    useState(false);
  const type = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';
  const [url, setUrl] = useState('');
  const {width} = useWindowDimensions();
  const screenNavigation = useNavigation<any>();
  const tabWidth = width / state.routes.length;

  /**
   * Toggles verification modal visibility
   */
  const toggleVerificationModal = () => {
    setShowVerificationModal(prev => !prev);
  };

  /**
   * Gets the user's KYC/KYB status based on account type
   */
  const getStatus = () => {
    if (individualProfile && type == 'ind') {
      return individualProfile.kycStatus;
    } else if (businessProfile && type == 'bus') {
      return businessProfile.kybStatus;
    } else {
      return 'STR';
    }
  };

  /**
   * Fetches the verification URL for KYC/KYB
   */
  const getUrl = async () => {
    try {
      const type = accountType == AccountType.BUSINESS ? 'BUS' : 'IND';
      const response = await get(`${URLS.getKycUrl}?accountType=${type}`);
      if (response) {
        setUrl(response.data.url);
        console.log(response.data.url, 'urll==>');
      }
    } catch (error) {
      return error;
    }
  };

  /**
   * Toggles in-progress verification modal visibility
   */
  const toggleVerificationModalInProgress = () => {
    setShowVerificationModalInProgress(prev => !prev);
  };

  return (
    <View style={[styles.container, styles.separator]}>
      <View style={[styles.sliderContainer, {width: tabWidth - 20}]}></View>

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const handleNavigation = async (routeName: string, status: string) => {
          const ActiveWallet = await getWalletByCurrencyAndProfile(
            userWallets,
            wallet,
            accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus',
          );
          setText(
            wallet == CARD_TYPE.NGN &&
              isUserVerified(getStatus()) &&
              ActiveWallet[0].partnerBankId
              ? COMMON.bvnVerifyText
              : wallet == CARD_TYPE.NGN
              ? COMMON.ngnAccountInProgress
              : isUserRejected(getStatus())
              ? COMMON.identityVerificationTextRejected
              : COMMON.identityVerificationTextProcess,
          );
          if (
            status === 'VER' &&
            ActiveWallet[0] &&
            ActiveWallet[0].status == 'SUC'
          ) {
            const navigateTo =
              routeName === BOTTOM_TAB_NAVIGATOR.recieveMoney
                ? DRAWER_NAVIGATOR.QRCode
                : MAIN_NAVIGATOR.SendMoney;
            screenNavigation.navigate(navigateTo);
          } else {
            if (wallet == CARD_TYPE.NGN) {
              toggleVerificationModalInProgress();
            } else if (isUserRejected(getStatus())) {
              toggleVerificationModalInProgress();
            } else {
              await getUrl();
              toggleVerificationModal();
            }
          }
        };

        const onPress = async (routeName: string) => {
          const status = getStatus();
          if (
            routeName === BOTTOM_TAB_NAVIGATOR.recieveMoney ||
            routeName === BOTTOM_TAB_NAVIGATOR.sendMoney
          ) {
            await handleNavigation(routeName, status);
          } else {
            navigation.navigate({params: {}, name: routeName, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const renderOption = () => {
          const name = route.name;
          const props = {isFocused, name};
          if (name) {
            return <TabIcon {...props} />;
          }

          return null;
        };

        return (
          <View key={route.key} style={{flex: 1}}>
            <PopUp
              modalVisible={showVerificationModal}
              toggleModal={toggleVerificationModal}
              isVerificationModal
              url={url}
            />
            <InProcessKYC
              text={text}
              modalVisible={showVerificationModalInProgress}
              toggleModal={toggleVerificationModalInProgress}
            />
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={() => onPress(route.name)}
              onLongPress={onLongPress}
              style={styles.item}>
              {renderOption()}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

export default TabBar;
