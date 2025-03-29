import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PATHS from '@kp/constants/paths';
import styles from './styles';
import DrawerIcon from '@kp/svgs/DrawerIcon';
import CompanyIcon from '@kp/svgs/CompanyIcon';
import PopUp from '@kp/components/common/Modal';
import AppTextInput from '../form/TextInput';
import {RECIPIENT_SCREEN} from '@kp/constants/appText';
import {useNavigation} from '@react-navigation/native';
import {LogOut} from 'lucide-react-native';
import COLOR from '@kp/constants/colors';
import {MMKV} from 'react-native-mmkv';
import {useAppDispatch} from '@kp/redux/slices';
import {
  logoutUser,
  resetUserWalletAndTransaction,
} from '@kp/redux/slices/userSlice';
import {useLogoutUsersMutation, usersApi} from '@kp/redux/service/users';

/**
 * Header Component
 * - Displays a customizable header with title, navigation controls, and actions
 * - Supports home and back navigation, search functionality, and logout
 * - Integrates with Formik, Redux, and React Navigation
 */
const Header: React.FC<Header> = ({
  title,
  isHome = false,
  isBackButton = false,
  isLeftTitle = false,
  style,
  isRow = false,
  canShare = false,
  showSearch = false,
  userType,
  onSearch,
  goBack,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();
  const storage = new MMKV();
  const [logoutUsers] = useLogoutUsersMutation();

  const dispatch = useAppDispatch();

  /**
   * Toggles the modal visibility
   */
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  /**
   * Opens the navigation drawer
   */
  const openDrawer = () => {
    navigation.toggleDrawer();
  };

  /**
   * Handles text change for search input
   * @param val - New search text
   */
  const handleSearch = (val: string) => {
    setSearch(val);
    onSearch?.(val);
  };

  /**
   * Handles back button press
   */
  const backPress = () => {
    goBack ? goBack() : navigation.goBack();
  };

  /**
   * Logs out the user, resets state, and clears storage
   */
  const handleLogout = async () => {
    console.log('restting State');
    logoutUsers(undefined).unwrap();
    dispatch(resetUserWalletAndTransaction());
    dispatch(logoutUser());
    dispatch(usersApi.util.resetApiState());
    storage.delete('accessToken');
  };

  return (
    <ImageBackground style={[styles.header, style]} source={PATHS.header}>
      <PopUp modalVisible={modalVisible} toggleModal={toggleModal} />
      {isHome && (
        <View style={styles.container}>
          <View style={styles.homeLeftContainer}>
            <TouchableOpacity
              style={styles.navigationIcon}
              onPress={openDrawer}>
              <DrawerIcon />
            </TouchableOpacity>
            <View style={styles.subContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.companyText}>
                {title}
              </Text>
            </View>
          </View>
          <View style={styles.homeRightContainer}>
            <View style={styles.notificationIcon}>
              {userType == 'IAB' && (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <CompanyIcon />
                </TouchableOpacity>
              )}
            </View>
            {/* <TouchableOpacity
              style={{ marginRight: 10 }}>
              <NotificationIcon />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={handleLogout}>
              <LogOut
                strokeWidth={1.25}
                width={23}
                height={26}
                color={COLOR.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!isHome && (
        <View
          style={[
            isBackButton && styles.centerVertical,
            isLeftTitle && styles.leftVertical,
            isRow && styles.transactionHeader,
          ]}>
          {isBackButton && (
            <TouchableOpacity style={styles.backContainer} onPress={backPress}>
              <Image style={styles.backIcon} source={PATHS.backIcon} />
            </TouchableOpacity>
          )}
          <Text style={[styles.headerText, isLeftTitle && styles.textLeft]}>
            {title}
          </Text>

          {canShare && (
            <TouchableOpacity onPress={backPress}>
              <Image style={styles.shareIcon} source={PATHS.share} />
            </TouchableOpacity>
          )}
        </View>
      )}
      {showSearch && (
        <View style={styles.searchContainer}>
          <Text style={styles.label}>{RECIPIENT_SCREEN.search}</Text>
          <AppTextInput
            value={search}
            onChangeText={handleSearch}
            containerStyle={styles.input}
          />
          <TouchableOpacity
            style={styles.closeIconContainer}
            onPress={() => handleSearch('')}>
            <Image source={PATHS.close} style={styles.iconImg} />
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

export default Header;
