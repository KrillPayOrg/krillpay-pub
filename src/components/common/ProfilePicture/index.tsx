import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import {FLAG_TYPE} from '@kp/constants/appText';
import FastImage from 'react-native-fast-image';

/**
 * ProfilePicture Component
 * - Displays a user's profile picture using `FastImage` for optimized image loading
 * - Shows initials when no image source is provided
 * - Optionally displays a country flag based on the `showFlag` and `type` props
 */
const ProfilePicture: React.FC<ProfilePicture> = ({
  style,
  showFlag,
  type,
  source,
}) => {
  return (
    <View style={style}>
      <FastImage
        style={style}
        source={source}
        resizeMode={FastImage.resizeMode.cover}
      />
      {showFlag && type && (
        <Image style={styles.userFlag} source={PATHS[FLAG_TYPE[type]]} />
      )}
    </View>
  );
};

export default ProfilePicture;
