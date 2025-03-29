import Papper from '@kp/components/common/Papper';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const MethodCard: React.FC<MethodCard> = ({
  type,
  onPress,
  isActive,
  title,
  text,
}) => {
  return (
    <Papper style={[styles.card, {height: text ? 90 : 70}]}>
      {type && (
        <>
          <TouchableOpacity
            style={styles.pressable}
            onPress={() => onPress(type)}>
            <View style={{width: '90%'}}>
              <Text style={styles.cardText}>{title}</Text>
              <Text style={styles.cardHint}>{text}</Text>
            </View>
            <View style={[styles.radio, isActive && styles.activRadio]}>
              {isActive && <View style={[styles.radioFill, styles.active]} />}
            </View>
          </TouchableOpacity>
        </>
      )}
    </Papper>
  );
};

export default MethodCard;
