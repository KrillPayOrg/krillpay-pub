import Papper from '@kp/components/common/Papper';
import Person from '@kp/svgs/Person';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import BussinessIcon from '@kp/svgs/BussinessIcon';

interface AccountCardProps {
  type: string;
  onPress: (network: Network) => void;
  isActive: boolean;
  title: string;
  id: string;
  network: Network;
}

const ChannelCard: React.FC<AccountCardProps> = ({
  type,
  onPress,
  isActive,
  title,
  id,
  network,
}) => {
  return (
    <Papper style={styles.card}>
      <TouchableOpacity
        style={styles.pressable}
        onPress={() => onPress(network)}>
        {type === 'momo' ? <Person /> : <BussinessIcon />}
        <Text style={styles.cardText}>{title}</Text>
        <View style={[styles.radio, isActive && styles.activRadio]}>
          {isActive && <View style={[styles.radioFill, styles.active]} />}
        </View>
      </TouchableOpacity>
    </Papper>
  );
};

export default ChannelCard;
