import OutlinedButton from '@kp/components/common/OutlinedButton';
import DownloadIcon from '@kp/svgs/DownloadIcon';
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {COMMON} from '@kp/constants/appText';
/**
 * QrButtons Component
 * - Provides buttons for sharing and downloading a QR code.
 * - Uses `OutlinedButton` with icons for a consistent UI.
 * - Accepts callback functions `downloadQrCode` and `shareQrCode`.
 */
const QrButtons = ({downloadQrCode, shareQrCode}: any) => {
  return (
    <View style={styles.container}>
      <OutlinedButton
        rotate="180deg"
        style={styles.btn}
        width="50%"
        title={COMMON.share}
        onPress={shareQrCode}
        Icon={DownloadIcon}
      />
      <OutlinedButton
        style={styles.btn}
        width="50%"
        title={COMMON.download}
        onPress={downloadQrCode}
        Icon={DownloadIcon}
      />
    </View>
  );
};

export default QrButtons;
