import React, {useEffect, useState} from 'react';
import styles from './styles';
import Header from '@kp/components/common/Header';
import {PROFILE_SCREEN} from '@kp/constants/appText';

import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ProfilePicture from '@kp/components/common/ProfilePicture';
import PATHS from '@kp/constants/paths';
import ProfileItem from './ProfileItem';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';
import {showToast} from '@kp/utils/common';
import {useAppSelector} from '@kp/redux/slices';
import BottomSheet from '@kp/components/common/BottomSheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import COLOR from '@kp/constants/colors';
import {getInitials, truncateWithEllipsis} from '@kp/utils/helper';
import {
  useGetUserInfoQuery,
  useUploadAvatarMutation,
} from '@kp/redux/service/users';
import LoaderModal from '@kp/components/common/Modal/LoaderModal';

const ProfileScreen = ({navigation, route}: any) => {
  const {accountType} = useAccountContext();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const {info, individualProfile, businessProfile} = useAppSelector(
    state => state.user,
  );
  const {data, isLoading, isFetching, refetch} = useGetUserInfoQuery(null);
  const [refreshing, setRefreshing] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const selectedAccountType =
    accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS';

  /**
   * onRefresh
   * - Refreshes user profile data
   */
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const {showBackButton} = route.params ?? {};
  const profile =
    accountType == AccountType.INDIVIDUAL ? individualProfile : businessProfile;
  const [avatar, setAvatar] = useState(profile.avatar);
  const [onUpdateImage, setOnUpdateImage] = useState(Math.random());

  useEffect(() => {
    return () => {
      setImageLoader(false);
    };
  }, []);

  /**
   * Handles opening the camera and uploading a new profile picture.
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
   * Handles opening the gallery and uploading a new profile picture.
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

  /**
   * Handles uploading a new avatar to the server.
   */
  const sendAvatar = async (formData: any, uri: any) => {
    setImageLoader(true);
    try {
      await uploadAvatar(formData).unwrap();
      setIsBottomSheetOpen(false);
      setImageLoader(false);
      onRefresh();
    } catch (error) {
      setImageLoader(false);
      setIsBottomSheetOpen(false);
      showToast('something went wrong');
      console.log(error);
    }
  };

  /**
   * Handles deleting the user's avatar.
   */
  const onDelete = async () => {
    setImageLoader(true);
    try {
      let formData = new FormData();
      formData.append('accountType', selectedAccountType);
      await uploadAvatar(formData as any).unwrap();
      setIsBottomSheetOpen(false);
      setImageLoader(false);
      onRefresh();
    } catch (error) {
      setImageLoader(false);
      setIsBottomSheetOpen(false);
      showToast('something went wrong');
      console.log(error);
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

  return (
    <SafeAreaView style={styles.container}>
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
      <Header
        title={'Profile'}
        style={styles.header}
        isLeftTitle
        isBackButton={showBackButton ? true : false}
        navigation={navigation}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.mt20}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setIsBottomSheetOpen(true)}>
          {avatar ? (
            <ProfilePicture
              showFlag={false}
              source={{uri: avatar + '?' + onUpdateImage}}
              style={styles.profileLogo}
            />
          ) : (
            <View style={styles.InitialsView}>
              <Text style={styles.initialaText}>
                {getInitials(`${info.firstName + ' ' + info.lastName}`)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.semiBold}>
          {truncateWithEllipsis(
            accountType == AccountType.INDIVIDUAL
              ? info.firstName + ' ' + info.lastName
              : profile.displayName,
            20,
          )}
        </Text>
        <ProfileItem
          title={PROFILE_SCREEN.krillTag}
          value={profile.krillTag}
          style={styles.profileColor}
          image={PATHS.profileIcon}
        />
        <ProfileItem
          title={PROFILE_SCREEN.phoneNum}
          value={
            accountType == AccountType.INDIVIDUAL
              ? info.mobileNumber
              : profile.businessPhoneNumber
          }
          style={styles.callColor}
          image={PATHS.call}
        />
        <ProfileItem
          title={PROFILE_SCREEN.email}
          value={
            accountType == AccountType.INDIVIDUAL
              ? info.email
              : profile.businessEmail
          }
          style={styles.messageColor}
          image={PATHS.message}
        />
        {profile.dob && (
          <ProfileItem
            title={PROFILE_SCREEN.dob}
            value={profile.dob}
            style={styles.dobColor}
            image={PATHS.dob}
          />
        )}
        {profile.addressLine1 && (
          <ProfileItem
            title={PROFILE_SCREEN.address}
            value={
              profile.addressLine1 +
              (profile.addressLine2 ? ' ' + profile.addressLine2 : '')
            }
            style={styles.addressColor}
            image={PATHS.address}
          />
        )}
        {profile.city && (
          <ProfileItem
            title={'City'}
            value={profile.city}
            style={styles.cityColor}
            image={PATHS.city}
          />
        )}
        {profile.state && (
          <ProfileItem
            title={'State'}
            value={profile.state}
            style={styles.stateColor}
            image={PATHS.state}
          />
        )}
        {profile.country && (
          <ProfileItem
            title={'Country'}
            value={profile.country}
            style={styles.countryColor}
            image={PATHS.country}
          />
        )}
        <View style={{margin: 20}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
