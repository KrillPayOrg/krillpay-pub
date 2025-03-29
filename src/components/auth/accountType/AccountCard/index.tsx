import Papper from '@kp/components/common/Papper';
import Person from '@kp/svgs/Person';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {AccountType} from '@kp/constants/enum';
import BussinessIcon from '@kp/svgs/BussinessIcon';

/**
 * Renders a selectable card for an account type.
 * - Displays an icon based on the account type.
 * - Shows the title and a radio button for selection state.
 * - Triggers a callback when pressed.
 */
const AccountCard: React.FC<AccountCard> = ({
  type,
  onPress,
  isActive,
  title,
}) => {
  return (
    <Papper style={styles.card}>
      <TouchableOpacity style={styles.pressable} onPress={() => onPress(type)}>
        {type === AccountType.INDIVIDUAL ? <Person /> : <BussinessIcon />}
        <Text style={styles.cardText}>{title}</Text>
        <View style={[styles.radio, isActive && styles.activRadio]}>
          {isActive && <View style={[styles.radioFill, styles.active]} />}
        </View>
      </TouchableOpacity>
    </Papper>
  );
};

export default AccountCard;
