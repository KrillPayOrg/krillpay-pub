import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomTabNavigator from '../BottomTabsNavigator';
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import PATHS from '@kp/constants/paths';
import styles from './styles';
import ProfilePicture from '@kp/components/common/ProfilePicture';
import DrawerItemList from '@kp/components/common/DrawerItem';
import {DRAWER_NAVIGATOR, MAIN_NAVIGATOR} from '@kp/constants/routes';
import {COMMON} from '@kp/constants/appText';
import TransactionHistory from '@kp/screens/TransactionHistory';
import QrScreen from '@kp/screens/QrScreen';
import SettingScreen from '@kp/screens/SettingsScreen';
import {MMKV} from 'react-native-mmkv';
import {useAppDispatch, useAppSelector} from '@kp/redux/slices';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';
import {
  logoutUser,
  resetUserWalletAndTransaction,
} from '@kp/redux/slices/userSlice';
import {useLogoutUsersMutation, usersApi} from '@kp/redux/service/users';
import AccountDetailsScreen from '@kp/screens/AccountDetailsScreen';
import Dispute from '@kp/screens/Dispute';
import ContactUs from '@kp/screens/ContactUs';
import {URLS} from '@kp/constants/api';
import {truncateWithEllipsis} from '@kp/utils/helper';
import {useEffect, useState} from 'react';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const storage = new MMKV();
  const {accountType} = useAccountContext();
  const {info, individualProfile, businessProfile} = useAppSelector(
    state => state.user,
  );
  const [logoutUsers] = useLogoutUsersMutation();
  const dispatch = useAppDispatch();
  const profile =
    accountType == AccountType.INDIVIDUAL ? individualProfile : businessProfile;
  const [onUpdateImage, setOnUpdateImage] = useState(Math.random());

  const handleLogout = async () => {
    logoutUsers(undefined).unwrap();
    dispatch(resetUserWalletAndTransaction());
    dispatch(logoutUser());
    dispatch(usersApi.util.resetApiState());
    storage.delete('accessToken');
  };

  useEffect(() => {
    setOnUpdateImage(Math.random());
  }, [profile]);

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => props.navigation.closeDrawer()}
        style={styles.closeIconContainer}>
        <Image style={styles.closeIcon} source={PATHS.closeDrawer} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            props.navigation.navigate(MAIN_NAVIGATOR.profileScreen, {
              showBackButton: true,
            })
          }>
          <ImageBackground
            style={styles.logo}
            imageStyle={styles.imageStyle}
            source={PATHS.header}>
            <View style={styles.headerContainer}>
              <ProfilePicture
                showFlag={false}
                source={
                  profile?.avatar
                    ? {uri: profile.avatar + '?' + onUpdateImage}
                    : PATHS.profilePic
                }
                style={styles.image}
              />
              <View style={styles.subContainer}>
                {accountType == AccountType.INDIVIDUAL ? (
                  <Text style={styles.header}>
                    {truncateWithEllipsis(
                      `${info?.firstName} ${info?.lastName}`,
                      15,
                    )}
                  </Text>
                ) : (
                  <Text style={styles.header}>
                    {truncateWithEllipsis(profile?.displayName, 15)}
                  </Text>
                )}
                <Text style={styles.text}>
                  {truncateWithEllipsis(profile?.krillTag, 20)}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.itemList}>
          <DrawerItemList {...props} />
          <View style={styles.faqContainer}>
            <TouchableOpacity
              onPress={() => Linking.openURL(URLS.externalSupportURL)}
              style={styles.faqTouch}>
              <Image
                style={{
                  width: 28,
                  height: 28,
                }}
                source={PATHS.FAQ}
              />
              <Text style={styles.faqText}>{DRAWER_NAVIGATOR.FAQ}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Image style={styles.logOutIcon} source={PATHS.logout} />
          <Text style={styles.logOutText}>{COMMON.logout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const DrawerIcon = ({focused, source}: {focused: boolean; source: any}) => (
  <Image
    style={[
      styles.drawerIcon,
      focused ? styles.focusedIcon : styles.inactiveIcon,
    ]}
    source={source}
  />
);

function MyDrawer() {
  const {info} = useAppSelector(state => state.user);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{headerShown: false}}
      initialRouteName={DRAWER_NAVIGATOR.home}>
      <Drawer.Screen
        name={DRAWER_NAVIGATOR.home}
        options={{
          drawerIcon: ({focused}) => (
            <DrawerIcon focused={focused} source={PATHS.home} />
          ),
        }}
        component={BottomTabNavigator}
      />
      <Drawer.Screen
        name={DRAWER_NAVIGATOR.QRCode}
        options={{
          drawerIcon: ({focused}) => (
            <DrawerIcon focused={focused} source={PATHS.qrCode} />
          ),
        }}
        component={QrScreen}
      />
      <Drawer.Screen
        name={DRAWER_NAVIGATOR.KYCDetails}
        options={{
          drawerIcon: ({focused}) => (
            <DrawerIcon focused={focused} source={PATHS.kycDetails} />
          ),
        }}
        component={BottomTabNavigator}
      />
      <Drawer.Screen
        name={DRAWER_NAVIGATOR.TransactionHistory}
        options={{
          drawerIcon: ({focused}) => (
            <DrawerIcon focused={focused} source={PATHS.TransactionHistory} />
          ),
        }}
        component={TransactionHistory}
      />
      {info && info.userType !== 'IAB' && info.mobileCountry == 'US' && (
        <Drawer.Screen
          name={
            info.userType == 'BUS'
              ? DRAWER_NAVIGATOR.CreateIndividualAccount
              : DRAWER_NAVIGATOR.CreateBusinessAccount
          }
          options={{
            drawerIcon: ({focused}) => (
              <DrawerIcon focused={focused} source={PATHS.CreateAccount} />
            ),
          }}
          initialParams={{
            type:
              info.userType == 'IND'
                ? AccountType.INDIVIDUAL
                : AccountType.BUSINESS,
            isLoggedIn: true,
          }}
          component={AccountDetailsScreen}
        />
      )}
      <Drawer.Screen
        name={DRAWER_NAVIGATOR.Dispute}
        options={{
          drawerIcon: ({focused}) => (
            <DrawerIcon focused={focused} source={PATHS.CreateAccount} />
          ),
        }}
        component={Dispute}
      />
      <Drawer.Screen
        name={DRAWER_NAVIGATOR.ContactUs}
        options={{
          drawerIcon: ({focused}) => (
            <DrawerIcon focused={focused} source={PATHS.ContactUs} />
          ),
        }}
        component={ContactUs}
      />
      <Drawer.Screen
        name={DRAWER_NAVIGATOR.Setting}
        options={{
          drawerIcon: ({focused}) => (
            <DrawerIcon focused={focused} source={PATHS.setting} />
          ),
        }}
        component={SettingScreen}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
