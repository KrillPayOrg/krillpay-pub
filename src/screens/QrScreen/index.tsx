import * as React from 'react';
import {Platform, Text, View, Share as ReactShare, Image} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import styles from './styles';
import Share from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';
import PATHS from '@kp/constants/paths';
import COLOR from '@kp/constants/colors';
import Scanner from '@kp/components/QRComponent/Scanner';
import {COMMON, QR_SCREEN} from '@kp/constants/appText';
import Header from '@kp/components/common/Header';
import QrButtons from '@kp/components/QRComponent/QrButtons';
import QrTabs from '@kp/components/QRComponent/QrTabs';
import {useAppSelector} from '@kp/redux/slices';
import {AccountType} from '@kp/constants/enum';
import {useAccountContext} from '@kp/context/accountType';
import {filterObjectsByCountry, showToast} from '@kp/utils/common';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import ViewShot from 'react-native-view-shot';
import {requestStoragePermission} from '@kp/utils/helper';

interface Props {
  navigation: NavigationProp<any>;
}

const QrScreen = ({navigation}: Props) => {
  const [active, setActive] = React.useState(QR_SCREEN.qrTabs.scanTab);
  const [hideButton, setHideButton] = React.useState(false);
  const qrRef = React.useRef<any>();
  const {info, individualProfile, businessProfile} = useAppSelector(
    state => state.user,
  );
  const {userWallets} = useAppSelector(state => state.user);
  const {accountType} = useAccountContext();
  const [qrCodeValue, setQrCodeValue] = React.useState<any>(null);
  const selectedAccType = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';
  const profile =
    accountType == AccountType.INDIVIDUAL ? individualProfile : businessProfile;
  const mobileNumber =
    accountType == AccountType.INDIVIDUAL
      ? info.mobileNumber
      : businessProfile.businessPhoneNumber;

  React.useEffect(() => {
    const body = {
      krillTag: profile.krillTag,
    };
    setQrCodeValue(
      `https://www.krillpay.com/krillpayqrcode?user=${JSON.stringify(
        profile.krillTag,
      )}`,
    );
  }, [accountType]);

  const goBack = () => {
    navigation.goBack();
  };

  //Share QRCODE file name
  const filename = `krillpayQr${profile.krillTag}`;

  const downloadFile = async () => {
    setHideButton(true); // Hide button before taking screenshot

    if (qrRef.current) {
      try {
        // Wait for UI update before capturing
        await new Promise(resolve => setTimeout(resolve, 500));

        // Capture the screenshot
        const uri = await qrRef.current.capture({
          format: 'png',
          quality: 1.0,
        });

        const filename = `krillpayQr${profile.krillTag}${Math.random()}.png`;

        // Check permission before saving (Android <10 only)
        if (!(await requestStoragePermission())) {
          showToast('Storage permission denied');
          return;
        }

        let destinationPath;
        if (Platform.OS === 'android') {
          destinationPath = `${RNFS.DownloadDirectoryPath}/${filename}`;
        } else {
          destinationPath = `${RNFS.LibraryDirectoryPath}/${filename}`;
        }

        // Move the file to the desired location
        await RNFS.moveFile(uri, destinationPath);

        // ✅ Refresh the gallery so the image appears
        if (Platform.OS === 'android') {
          await RNFetchBlob.fs.scanFile([
            {path: destinationPath, mime: 'image/png'},
          ]);
        }

        if (Platform.OS === 'android' && Platform.Version < 29) {
          // Add to Downloads for Android 9 and below
          await RNFetchBlob.android.addCompleteDownload({
            title: filename,
            description: 'QR Code saved',
            mime: 'image/png',
            path: destinationPath,
            showNotification: true,
          });
        }

        showToast('Image saved successfully!');
      } catch (error) {
        console.log('Error saving image:', error);
      } finally {
        setHideButton(false);
      }
    }
  };

  const onShare = React.useCallback(() => {
    setHideButton(true);
    setTimeout(() => {
      qrRef.current
        .capture()
        .then(async (uri: any) => {
          try {
            const options = {
              title: 'Share the QR',
              message: `Qr Code Of User ${profile.krillTag}`,
              url: uri,
              type: 'image/png',
              showAppsToView: true,
              filename: 'Qr Code',
              saveToFiles: true,
            };

            setHideButton(false);

            Platform.OS == 'android'
              ? await Share.open(options)
              : await ReactShare.share(options);
            showToast('QRCODE Shared');
          } catch (e) {
            setHideButton(false);

            console.log(e);
          }
        })
        .catch((e: any) => console.error(e));
    }, 500);
  }, []);

  return (
    <>
      <Header
        title={COMMON.myQR}
        style={styles.header}
        isBackButton
        isLeftTitle
        goBack={goBack}
        navigation={navigation}
      />
      {active === QR_SCREEN.qrTabs.qrTab && (
        <View style={styles.receiveMoneyContainer}>
          <Text style={styles.receiveMoneyHeading}>{COMMON.receiveMoney}</Text>
          <Text style={styles.receiveMoneyDes}>{COMMON.receiveMoneyDes}</Text>
        </View>
      )}
      <View
        style={[
          styles.container,
          {paddingTop: active === QR_SCREEN.qrTabs.qrTab ? 36 : 0},
        ]}>
        {active === QR_SCREEN.qrTabs.qrTab ? (
          <ViewShot
            ref={qrRef}
            style={styles.viewShotStyle}
            options={{fileName: filename, format: 'png'}}>
            {hideButton && (
              <Image
                source={PATHS.krillApp}
                style={styles.krillAppLogo}
                resizeMode="contain"
              />
            )}
            <View style={styles.parentQrContainer}>
              {/*Qr with name,tag and number container*/}
              <View style={styles.qrContainer}>
                {/*Krill username*/}
                {(info || profile) && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name} numberOfLines={1}>
                      {accountType == AccountType.INDIVIDUAL
                        ? info?.firstName + ' ' + info?.lastName
                        : profile?.displayName}
                    </Text>
                  </View>
                )}
                {/*Krill Qrcode Outline container*/}
                <View style={styles.qrBorder}>
                  <QRCode
                    logoSize={50}
                    logo={PATHS.logoSp}
                    // logoMargin={5}
                    logoBorderRadius={16}
                    logoBackgroundColor={'transparent'}
                    value={qrCodeValue}
                    size={220}
                  />
                </View>

                <View style={styles.infoContainer}>
                  {profile?.krillTag && (
                    <Text style={styles.tag}>{profile.krillTag}</Text>
                  )}
                  {mobileNumber && (
                    <Text style={styles.tag}>{mobileNumber}</Text>
                  )}
                </View>
              </View>

              {!hideButton && (
                <QrButtons
                  downloadQrCode={downloadFile}
                  shareQrCode={onShare}
                />
              )}
            </View>
            {hideButton && (
              <Text style={styles.scanSub}>{COMMON.ScanKrillPay}</Text>
            )}
          </ViewShot>
        ) : (
          <View style={[{flex: 1}, styles.qrWrapper]}>
            <View style={styles.qrWrapper}>
              <Scanner navigation={navigation} />
            </View>
          </View>
        )}
        <QrTabs setActive={setActive} active={active} />
      </View>
    </>
  );
};

export default QrScreen;
