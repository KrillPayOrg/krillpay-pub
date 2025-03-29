import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '@kp/components/common/Header';
import {COMMON, SECUIRTY_SCREEN_TEXT} from '@kp/constants/appText';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import ProfilePicture from '@kp/components/common/ProfilePicture';
import PATHS from '@kp/constants/paths';
import SettingItem from './SettingItem';
import {useNavigation} from '@react-navigation/native';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import {useAppSelector} from '@kp/redux/slices';
import {AccountType} from '@kp/constants/enum';
import {useAccountContext} from '@kp/context/accountType';
import BottomSheet from '@kp/components/common/BottomSheet';
import COLOR from '@kp/constants/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showToast} from '@kp/utils/common';
import {
  useGetUserInfoQuery,
  useUploadAvatarMutation,
} from '@kp/redux/service/users';
import LoaderModal from '@kp/components/common/Modal/LoaderModal';
import {truncateWithEllipsis} from '@kp/utils/helper';

const SettingScreen = (props: {navigation: any}) => {
  const {navigate} = useNavigation<any>();
  const [uploadAvatar] = useUploadAvatarMutation();
  const {accountType} = useAccountContext();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const {info, individualProfile, businessProfile} = useAppSelector(
    state => state.user,
  );
  const {data, isLoading, isFetching, refetch} = useGetUserInfoQuery(null);
  const profile =
    accountType == AccountType.INDIVIDUAL ? individualProfile : businessProfile;
  const [avatar, setAvatar] = useState(profile.avatar);
  const [onUpdateImage, setOnUpdateImage] = useState(Math.random());

  const selectedAccountType =
    accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS';

  /**
   * onOpenCamera
   * - Opens the device camera to capture a photo
   * - Uploads the captured photo as avatar
   */
  const onOpenCamera = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
      });
      if (result.assets && result.assets[0].uri) {
        let localUri = result.assets[0].uri;
        let fileName = result.assets[0].fileName;
        let type = result.assets[0].type;
        let formData = new FormData();
        formData.append('file', {
          uri: localUri,
          name: fileName,
          type,
        });
        formData.append('accountType', selectedAccountType);
        sendAvatar(formData, localUri);
      }
    } catch (error) {
      setIsBottomSheetOpen(false);
      console.log(error, 'err');
      showToast('something went wrong');
    }
  };

  /**
   * onOpenGallery
   * - Opens the image gallery to select a photo
   * - Uploads the selected photo as avatar
   */
  const onOpenGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        includeBase64: true,
        selectionLimit: 1,
      });
      if (result.assets && result.assets[0].uri) {
        let localUri = result.assets[0].uri;
        let fileName = result.assets[0].fileName;
        let type = result.assets[0].type;
        let formData = new FormData();
        formData.append('file', {
          uri: localUri,
          name: fileName,
          type,
        });
        formData.append('accountType', selectedAccountType);
        sendAvatar(formData, localUri);
      }
    } catch (error: any) {
      console.log(error.response ? error.response.data : error.message);
      setIsBottomSheetOpen(false);
    }
  };

  useEffect(() => {
    if (data && !isLoading && !isFetching) {
      const profile =
        accountType == AccountType.INDIVIDUAL
          ? individualProfile
          : businessProfile;
      setAvatar(profile.avatar);
      setOnUpdateImage(Math.random());
    }
  }, [data, isLoading, accountType, isFetching]);

  /**
   * sendAvatar
   * - Uploads avatar image to server
   * - Updates UI after successful upload
   */
  const sendAvatar = async (formData: any, uri: any) => {
    setImageLoader(true);
    try {
      await uploadAvatar(formData).unwrap();
      setImageLoader(false);
      refetch();
      setIsBottomSheetOpen(false);
    } catch (error) {
      setImageLoader(false);
      setIsBottomSheetOpen(false);
      showToast('something went wrong');
      console.log(error);
    }
  };

  /**
   * onDelete
   * - Deletes the current avatar
   * - Updates UI after successful deletion
   */
  const onDelete = async () => {
    setImageLoader(true);
    try {
      let formData = new FormData();
      formData.append('accountType', selectedAccountType);
      await uploadAvatar(formData as any).unwrap();
      setIsBottomSheetOpen(false);
      refetch();
      setImageLoader(false);
    } catch (error) {
      setImageLoader(false);
      setIsBottomSheetOpen(false);
      showToast('something went wrong');
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      setImageLoader(false);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={COMMON.settings}
        style={styles.header}
        isLeftTitle
        isBackButton
        navigation={props.navigation}
      />
      {imageLoader && <LoaderModal modalVisible={imageLoader} />}
      <BottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        sheetStyle={styles.container}>
        <View style={styles.contentScroll}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsBottomSheetOpen(false)}>
            <Image style={styles.backIcon} source={PATHS.close} />
          </TouchableOpacity>
          <View>
            <TouchableOpacity onPress={onOpenCamera} style={styles.imageButton}>
              <Text style={styles.imageButtonText}>Take Photo</Text>
              <Image style={styles.icon} source={PATHS.camera} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onOpenGallery}
              style={styles.imageButton}>
              <Text style={styles.imageButtonText}>Choose Photo</Text>
              <Image style={styles.icon} source={PATHS.gallery} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.imageButton}>
              <Text style={{...styles.imageButtonText, ...{color: COLOR.red}}}>
                Delete Photo
              </Text>
              <Image style={styles.icon} source={PATHS.trash} />
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
      <View style={styles.subContainer}>
        <View style={styles.row}>
          <ProfilePicture
            showFlag={false}
            source={
              avatar ? {uri: avatar + '?' + onUpdateImage} : PATHS.profilePic
            }
            style={styles.profileLogo}
          />
          <Text style={styles.semiBold} numberOfLines={1}>
            {truncateWithEllipsis(
              accountType == AccountType.INDIVIDUAL
                ? info.firstName + ' ' + info.lastName
                : profile.displayName,
              20,
            )}
          </Text>
        </View>
      </View>
      <View style={styles.settingContainer} />
      <View>
        <SettingItem
          title={SECUIRTY_SCREEN_TEXT.account.title}
          value={SECUIRTY_SCREEN_TEXT.account.value}
          image={PATHS.profileIcon}
          style={styles.profileColor}
          onPress={() =>
            navigate(MAIN_NAVIGATOR.profileScreen, {showBackButton: true})
          }
        />
        <SettingItem
          title={SECUIRTY_SCREEN_TEXT.avatar.title}
          value={SECUIRTY_SCREEN_TEXT.avatar.value}
          image={PATHS.avatar}
          style={styles.avatarColor}
          onPress={() => setIsBottomSheetOpen(true)}
        />
        <SettingItem
          title={SECUIRTY_SCREEN_TEXT.security.title}
          value={SECUIRTY_SCREEN_TEXT.security.value}
          image={PATHS.secuirty}
          style={styles.securityColor}
          onPress={() => navigate(MAIN_NAVIGATOR.securityScreen)}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
