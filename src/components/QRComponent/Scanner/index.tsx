import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import {NavigationProp, useFocusEffect} from '@react-navigation/native';
import styles from './styles';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import {hasRequiredKeys, showToast} from '@kp/utils/common';
import {useAppSelector} from '@kp/redux/slices';
import {useWalletContext} from '@kp/context/walletType';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';
import {CARD_TYPE} from '@kp/constants/appText';
import {URLS} from '@kp/constants/api';
import {get} from '@kp/client/services/api';
import COLOR from '@kp/constants/colors';

function safeJSONParse(value: any) {
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' && parsed !== null ? parsed : false;
  } catch (e) {
    console.error('JSON Parse Error:', e); // Log error for debugging
    return false;
  }
}

interface Props {
  navigation: NavigationProp<any>;
}

const Scanner = ({navigation}: Props) => {
  const scanning = useSharedValue(23);
  const device = useCameraDevice('back');
  const {accountType} = useAccountContext();
  const {setWallet} = useWalletContext();
  const {userWallets} = useAppSelector(state => state.user);
  const [qrLoader, setQrLoader] = React.useState<boolean>(false);

  const [isCameraActive, setIsCameraActive] = React.useState(true); // Control camera activity

  const scanningStyle = useAnimatedStyle(() => ({
    transform: [{translateY: scanning.value}],
  }));

  /**
   * Fetch data by scanning QR code.
   * @param krillTag - Extracted user tag from QR code.
   */
  const getDataByTag = async (krillTag: string | null) => {
    setQrLoader(true);
    try {
      const response = await get(`${URLS.krillTag}/${krillTag}`);
      if (response) {
        setQrLoader(false);

        return response.data;
      }
    } catch (error) {
      setQrLoader(false);
      console.error('LOG:', error);

      return error;
    }
  };

  /**
   * Extracts user parameter from URL string.
   * @param url - The scanned QR code URL.
   * @returns Extracted user parameter or null.
   */
  function getUserFromUrl(url: string) {
    // Match the user parameter, capturing its value
    const match = url.match(/[?&]user=("[^"]*"|'[^']*'|[^&]+)/);
    if (match && match[1]) {
      // Remove surrounding quotes if they exist
      return match[1].replace(/^"|"$/g, '');
    }
    return null;
  }

  //for scanning of the QR CODE
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async (codes: any) => {
      setIsCameraActive(false); // Disable camera while processing
      const type = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';
      const userWalletAccToType = userWallets[type];
      const tag = getUserFromUrl(codes[0].value);

      const QRCodeValues = await getDataByTag(tag);
      try {
        if (QRCodeValues) {
          const isKrillCode = hasRequiredKeys(QRCodeValues);
          const usdWallet =
            userWalletAccToType?.find(
              (item: any) => item.walletCurrency === 'USD',
            ) || null;
          const ngnWallet =
            userWalletAccToType?.find(
              (item: any) => item.walletCurrency === 'NGN',
            ) || null;
          console.log(QRCodeValues.ngnWalletId == ngnWallet?.id, 'truee?');
          if (
            isKrillCode &&
            (usdWallet || ngnWallet) &&
            ((QRCodeValues.UsWalletId && usdWallet) ||
              (QRCodeValues.ngnWalletId && ngnWallet)) &&
            QRCodeValues.UsWalletId !== usdWallet?.id &&
            QRCodeValues.ngnWalletId !== ngnWallet?.id
          ) {
            let body = {
              type: QRCodeValues.type,
              avatar: QRCodeValues.avatar,
              accountHolder: QRCodeValues.accountHolder,
              krillTag: QRCodeValues.krillTag,
              mobileNumber: QRCodeValues.mobileNumber,
            } as any;
            if (usdWallet && QRCodeValues.UsWalletId) {
              body.beneficiaryWalletId = QRCodeValues.UsWalletId;
              body.beneficiaryNubanNumber = QRCodeValues.UsWalletNubanNumber;
              setWallet(CARD_TYPE.USD);
            } else if (ngnWallet && QRCodeValues.ngnWalletId) {
              body.beneficiaryWalletId = QRCodeValues.ngnWalletId;
              body.beneficiaryNubanNumber = QRCodeValues.ngnWalletNubanNumber;
              setWallet(CARD_TYPE.NGN);
            } else {
              if (!usdWallet) {
                showToast(
                  "QR can't be scanned as user doesn't have active USD wallet",
                );
              } else if (!ngnWallet) {
                showToast(
                  "QR can't be scanned as user doesn't have active NGN wallet",
                );
              }
            }
            // setUserQrData({value: true, data: body});
            navigation.navigate(MAIN_NAVIGATOR.SendMoney, {recipient: body});
            return; // Exit on success
          } else {
            if (QRCodeValues.UsWalletId === usdWallet?.id) {
              showToast("You can't scan your own wallet");
              setIsCameraActive(true);
              navigation.goBack();
              return;
            }
            if (QRCodeValues.ngnWalletId === ngnWallet?.id) {
              showToast("You can't scan your own wallet");
              setIsCameraActive(true);
              navigation.goBack();
              return;
            }
            if (!usdWallet) {
              showToast(
                "QR can't be scanned as you don't have active USD wallet",
              );
            } else if (!ngnWallet) {
              showToast(
                "QR can't be scanned as you don't have active NGN wallet",
              );
            }
            navigation.goBack();
            return;
          }
        }
      } catch (error) {
        console.log(error, 'errr');
      } finally {
        setQrLoader(false);
      }
      setIsCameraActive(true); // Re-enable camera if processing fails
      return;
    },
  });

  React.useEffect(() => {
    scanning.value = withRepeat(
      withTiming(278, {
        duration: 2500,
        easing: Easing.linear,
      }),
      -2,
      true,
    );
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Re-enable the camera when the screen is focused
      setIsCameraActive(true);
      return () => {
        setIsCameraActive(false); // Optionally disable camera on blur
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={[styles.angle, styles.angleLeft]} />
      <View style={[styles.angle, styles.angleRight]} />
      <View style={[styles.angle, styles.angleBottomRight]} />
      <View style={[styles.angle, styles.angleBottomLeft]} />
      <Animated.View style={[styles.animatedLine, scanningStyle]} />
      {device && isCameraActive && (
        <Camera
          style={styles.camera}
          isActive={isCameraActive}
          device={device}
          codeScanner={codeScanner}
        />
      )}
      {qrLoader && (
        <ActivityIndicator
          size={'large'}
          color={COLOR.primary}
          style={styles.qrLoader}
        />
      )}
    </View>
  );
};

export default Scanner;
