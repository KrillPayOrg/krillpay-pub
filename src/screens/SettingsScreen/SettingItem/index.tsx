import React from 'react';
import styles from './styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Papper from '@kp/components/common/Papper';
import ToggleSwitch from 'toggle-switch-react-native';

import COLOR from '@kp/constants/colors';

interface Props {
  style: any;
  title: string;
  value?: string;
  image: any;
  styleSubContainer?: any;
  onPress?: () => void;
  onPressToggle?: (is: boolean) => void;
  isRadio?: boolean;
  toggleValue?: boolean;
}
const SettingItem = ({
  style,
  title,
  value,
  image,
  onPress,
  styleSubContainer,
  isRadio = false,
  toggleValue = false,
  onPressToggle,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={isRadio} style={styles.top}>
      <Papper style={styles.card}>
        <View style={[styles.logoContainer, style]}>
          <Image source={image} style={styles.logo} />
        </View>
        <View style={[styles.left, styleSubContainer]}>
          <Text style={styles.text}>{title}</Text>
          {value ? <Text style={styles.blurText}>{value}</Text> : null}
          {isRadio ? (
            <ToggleSwitch
              isOn={toggleValue}
              onColor={COLOR.primary}
              offColor={COLOR.light}
              size="medium"
              onToggle={onPressToggle}
            />
          ) : null}
        </View>
      </Papper>
    </TouchableOpacity>
  );
};
export default SettingItem;
