import PATHS from '@kp/constants/paths';
import React from 'react';
import {Image, View} from 'react-native';
import styles from '../style';
import {BOTTOM_TAB_NAVIGATOR} from '@kp/constants/routes';

const TabIcon = ({isFocused, name}: BottomIconProps) => {
  return (
    <View>
      {name == BOTTOM_TAB_NAVIGATOR.sendMoney ? (
        <View style={styles.tabIconFocused}>
          <Image
            style={[styles.tabIconFocus, isFocused && styles.tintWhite]}
            source={PATHS[name]}
          />
        </View>
      ) : (
         <Image
          style={[styles.tabIcon, isFocused && styles.tintWhite]}
          source={PATHS[name]}
        />
      )}
    </View>
  );
};

export default TabIcon;
