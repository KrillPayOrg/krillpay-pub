import * as React from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import {useAppDispatch, useAppSelector} from '@kp/redux/slices';
import {setHideStatusBar, setIsFirstTime} from '@kp/redux/slices/userSlice';

interface Props {
  navigation: any;
  route: any;
}

/**
 * SplashScreen Component
 * - Displays an animated splash screen with the app logo
 * - Hides the status bar during the animation
 * - Expands the logo and text with a timed animation
 * - Redirects to the appropriate screen based on authentication status
 */
const SplashScreen = ({navigation, route}: Props) => {
  const {token} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const dimensions = useSharedValue({width: 60, height: 60});
  const fontSize = useSharedValue({fontSize: 10});

  /**
   * logoStyle Animated Style
   * - Controls the width and height of the logo
   */
  const logoStyle = useAnimatedStyle(() => ({
    width: dimensions.value.width,
    height: dimensions.value.height,
  }));

  /**
   * textStyle Animated Style
   * - Controls the font size of the text
   */
  const textStyle = useAnimatedStyle(() => ({
    fontSize: fontSize.value.fontSize,
  }));

  React.useEffect(() => {
    // Hide status bar when SplashScreen mounts
    setHideStatusBar(true);

    // Clean up: show status bar when SplashScreen unmounts
    return () => {
      setHideStatusBar(false);
      dispatch(setIsFirstTime(true));
    };
  }, [setIsFirstTime]);

  React.useEffect(() => {
    dimensions.value = withTiming({width: 206, height: 206}, {duration: 4000});
    fontSize.value = withTiming({fontSize: 27}, {duration: 4000});
    setHideStatusBar(false);
    setTimeout(() => {
      token
        ? navigation.navigate(MAIN_NAVIGATOR.Drawer)
        : navigation.navigate(MAIN_NAVIGATOR.Auth);
    }, 4200);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[logoStyle, styles.subContainer]}>
        <Animated.Image style={logoStyle} source={PATHS.logoSp} />
        <Animated.Text style={[textStyle, styles.text]}>KrillPay</Animated.Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
