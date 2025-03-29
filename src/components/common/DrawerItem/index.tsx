import React from 'react';
import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
} from '@react-navigation/native';
import {DrawerItem} from '@react-navigation/drawer';
import type {DrawerContentComponentProps} from '@react-navigation/drawer';
import {View, Text} from 'react-native';
import styles from './styles';
import COLOR from '@kp/constants/colors';
import FONT_FAMILY from '@kp/constants/fonts';
import {DRAWER_TEXT, KYC_STATUS} from '@kp/constants/appText';
import {AccountType} from '@kp/constants/enum';
import {useAppDispatch, useAppSelector} from '@kp/redux/slices';
import {useAccountContext} from '@kp/context/accountType';
import {
  useGetKycStatusQuery,
  useLazyGetKycStatusQuery,
} from '@kp/redux/service/users';
import {setUserKycStatus} from '@kp/redux/slices/userSlice';
import {DRAWER_NAVIGATOR} from '@kp/constants/routes';
import {isUserVerified} from '@kp/utils/common';

/**
 * Renders KYC status label
 * - Displays KYC/KYB status based on account type
 * - Applies color styles depending on status level
 */
const getKycLabel = (kycText: string, type: AccountType) => (
  <View style={{left: -20, flexDirection: 'row'}}>
    <Text
      style={{
        fontFamily: FONT_FAMILY.interMedium,
        fontSize: 12,
        color: COLOR.black,
      }}>
      {type == AccountType.INDIVIDUAL ? 'KYC Status: ' : 'KYB Status: '}
    </Text>
    <Text
      style={{
        fontFamily: FONT_FAMILY.interMedium,
        fontSize: 12,
        color:
          kycText == KYC_STATUS.VER
            ? COLOR.mediumGreen
            : kycText == KYC_STATUS.STR || kycText == KYC_STATUS.COM
            ? COLOR.mediumYellow
            : COLOR.red,
      }}>
      {kycText}
    </Text>
  </View>
);

/**
 * DrawerItemList Component
 * - Custom drawer item list for navigation
 * - Fetches and updates KYC status
 * - Handles navigation actions
 */
const DrawerItemList = ({
  state,
  navigation,
  descriptors,
}: DrawerContentComponentProps) => {
  const buildLink = useLinkBuilder();
  const [getUserKYC] = useLazyGetKycStatusQuery();
  const {kycStatus} = useAppSelector(state => state.user);
  const {accountType} = useAccountContext();
  const dispatch = useAppDispatch();

  // Determines account key for KYC status retrieval
  const accountKey = accountType === AccountType.INDIVIDUAL ? 'ind' : 'bus';
  const kycText = kycStatus[accountKey];

  /**
   * Updates KYC status by fetching latest data
   */
  const updateKYCStatus = async () => {
    try {
      const data = await getUserKYC(null);
      console.log(data.data, 'asdaksd');
      dispatch(setUserKycStatus(data.data));
    } catch (error) {
      console.log('err', error);
    }
  };

  /**
   * Handles drawer item press events
   * - Updates KYC status if navigating to KYCDetails
   * - Navigates to selected screen otherwise
   */
  const handlePress = async (
    route: (typeof state.routes)[0],
    focused: boolean,
  ) => {
    const event = navigation.emit({
      type: 'drawerItemPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      if (route.name === 'KYCDetails') {
        await updateKYCStatus();
      } else {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate({name: route.name, merge: true})),
          target: state.key,
        });
      }
    }
  };

  // Conditionally hide QRCode drawer item if user is not verified
  return state.routes.map((route, i) => {
    const focused = i === state.index;
    const {drawerIcon, drawerLabelStyle, drawerAllowFontScaling} =
      descriptors[route.key].options;

    if (route.name == DRAWER_NAVIGATOR.QRCode) {
      const status =
        accountType == AccountType.INDIVIDUAL ? kycStatus.ind : kycStatus.bus;
      const statusVerified = isUserVerified(status);
      if (!statusVerified) {
        return;
      }
    }

    return (
      <View style={styles.container} key={route.key}>
        <DrawerItem
          key={route.key}
          style={[
            styles.background,
            focused ? styles.primaryColor : styles.whiteBg,
          ]}
          label={
            route.name === 'KYCDetails'
              ? () => getKycLabel(KYC_STATUS[kycText], accountType)
              : DRAWER_TEXT[route.name]
          }
          icon={drawerIcon}
          focused={focused}
          activeTintColor={COLOR.primaryLight}
          inactiveTintColor={COLOR.white}
          allowFontScaling={drawerAllowFontScaling}
          labelStyle={[
            drawerLabelStyle,
            styles.labelStyle,
            focused ? styles.whiteColor : styles.mediumColor,
          ]}
          to={buildLink(route.name, route.params)}
          onPress={() => handlePress(route, focused)}
        />
      </View>
    );
  });
};

export default DrawerItemList;
