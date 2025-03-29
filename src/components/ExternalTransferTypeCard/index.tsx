import Papper from '@kp/components/common/Papper';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import {ExternalTransferType} from '@kp/constants/enum';

interface ExternalTransferCard {
  type: ExternalTransferType;
  onPress: (type: ExternalTransferType) => void;
  isActive: boolean;
  title: string;
}

/**
 * ExternalTransferCard Component
 * - Displays an option for external transfers with an icon, title, and selection indicator.
 * - Uses `Papper` as a wrapper for card styling.
 * - Allows selection via a `TouchableOpacity` that triggers the `onPress` callback.
 * - Highlights the active selection with a filled radio button.
 */
const ExternalTransferCard: React.FC<ExternalTransferCard> = ({
  type,
  onPress,
  isActive,
  title,
}) => {
  return (
    <Papper style={styles.card}>
      <TouchableOpacity style={styles.pressable} onPress={() => onPress(type)}>
        <Image
          style={{width: 30, height: 30, resizeMode: 'contain'}}
          source={PATHS[type]}
        />
        <Text style={styles.cardText}>{title}</Text>
        <View style={[styles.radio, isActive && styles.activRadio]}>
          {isActive && <View style={[styles.radioFill, styles.active]} />}
        </View>
      </TouchableOpacity>
    </Papper>
  );
};

export default ExternalTransferCard;
