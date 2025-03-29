import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeScreen from '@kp/screens/HomeScreen/index';
import TabBar from '@kp/components/common/TabBar/index';
import {BOTTOM_TAB_NAVIGATOR} from '@kp/constants/routes';
import WalletScreen from '@kp/screens/WalletScreen';
import ProfileScreen from '@kp/screens/ProfileScreen';
import SendMoney from '@kp/screens/SendMoneyScreen';
import QrScreen from '@kp/screens/QrScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = (tabProps: BottomTabBarProps) => <TabBar {...tabProps} />;

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, unmountOnBlur: false, lazy: true}}
      backBehavior="none"
      tabBar={CustomTabBar}>
      <Tab.Screen name={BOTTOM_TAB_NAVIGATOR.home} component={HomeScreen} />
      <Tab.Screen
        name={BOTTOM_TAB_NAVIGATOR.recieveMoney}
        component={QrScreen}
      />
      <Tab.Screen name={BOTTOM_TAB_NAVIGATOR.sendMoney} component={SendMoney} />
      <Tab.Screen name={BOTTOM_TAB_NAVIGATOR.wallet} component={WalletScreen} />
      <Tab.Screen
        name={BOTTOM_TAB_NAVIGATOR.profile}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
