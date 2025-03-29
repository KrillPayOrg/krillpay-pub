import React from 'react';
import styles from './styles';
import {Image, Text, View} from 'react-native';
import Papper from '@kp/components/common/Papper';

const ProfileItem = ({style, title, value, image}: any) => {
  return (
    <View style={styles.top}>
      <Papper style={styles.card}>
        <View style={[styles.logoContainer, style]}>
          <Image source={image} style={styles.logo} />
        </View>
        <View style={styles.left}>
          <Text style={styles.blurText}>{title}</Text>
          <Text style={styles.text}>{value}</Text>
        </View>
      </Papper>
    </View>
  );
};

export default ProfileItem;
