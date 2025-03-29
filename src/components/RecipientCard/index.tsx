import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import ProfilePicture from '../common/ProfilePicture';
import PATHS from '@kp/constants/paths';
import styles from './styles';

/**
 * RecipientCard Component
 * - Displays recipient details including avatar, name, tag, and phone number
 * - Supports user interaction via TouchableOpacity
 * - Utilizes ProfilePicture component for displaying profile images
 * - Extracts initials from full name using getInitials helper
 */
const RecipientCard: React.FC<RecipientCard> = ({
  avatar,
  fullName,
  krillTag,
  mobileNumber,
  type,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ProfilePicture
        style={styles.avatar}
        source={avatar ? {uri: avatar} : PATHS.profilePic}
        showFlag
        type={type}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{fullName}</Text>
        <Text style={styles.tag}>{krillTag}</Text>
        <Text style={styles.phone}>{mobileNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RecipientCard;
