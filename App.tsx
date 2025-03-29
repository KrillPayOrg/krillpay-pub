/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, LogBox, Text, TextInput} from 'react-native';
// Extend the type to include defaultProps for Text
interface TextWithDefaultProps extends React.ComponentProps<typeof Text> {
  defaultProps?: {allowFontScaling?: boolean};
}

(Text as unknown as TextWithDefaultProps).defaultProps = {
  ...((Text as unknown as TextWithDefaultProps).defaultProps || {}),
  allowFontScaling: false,
};

// Do the same for TextInput
interface TextInputWithDefaultProps
  extends React.ComponentProps<typeof TextInput> {
  defaultProps?: {allowFontScaling?: boolean};
}
(TextInput as unknown as TextInputWithDefaultProps).defaultProps = {
  ...((TextInput as unknown as TextInputWithDefaultProps).defaultProps || {}),
  allowFontScaling: false,
};

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigator from '@kp/navigation';
import {AccountTypeProvider} from '@kp/context/accountType';
import {WalletTypeProvider} from '@kp/context/walletType';
import {Provider} from 'react-redux';
import {store} from '@kp/redux/store';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

function App(): React.JSX.Element {
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
  });
  LogBox.ignoreLogs(['Warning:']);
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <AccountTypeProvider>
          <WalletTypeProvider>
            <AppNavigator />
          </WalletTypeProvider>
        </AccountTypeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
