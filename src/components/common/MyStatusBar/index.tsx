import {SafeAreaView, StatusBar, View} from 'react-native';
import styles from './styles';

/**
 * MyStatusBar Component
 * - Custom status bar wrapper with a configurable background color
 * - Supports additional StatusBarProps for flexibility
 * - Ensures consistent status bar styling across the app
 */
const MyStatusBar = ({backgroundColor, hidden, ...props}: any) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        hidden={hidden}
        {...props}
      />
    </SafeAreaView>
  </View>
);

export default MyStatusBar;
