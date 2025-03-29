import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import {
  CARD_SYMBOL,
  CARD_TYPE,
  COMMON,
  DRAWER_TEXT,
} from '@kp/constants/appText';
import ProfilePicture from '@kp/components/common/ProfilePicture';
import COLOR from '@kp/constants/colors';
import Header from '@kp/components/common/Header';
import SelectWallet from '@kp/components/common/SelectWallet';
import {SafeAreaView} from 'react-native-safe-area-context';
import WalletButton from '@kp/components/common/WalletButton';
import PATHS from '@kp/constants/paths';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import PopUp from '@kp/components/common/Modal';
import {ScreenProps} from '../../../@types/form';
import {
  getTransactionText,
  shouldShowRed,
  shouldShowRedTransfer,
} from '@kp/utils/transaction';
import {useAppSelector} from '@kp/redux/slices';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';
import {transactionHistorySize} from '@kp/constants';
import {useWalletContext} from '@kp/context/walletType';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {DownloadIcon} from 'lucide-react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {
  useGetWalletTransactionQuery,
  useGetWalletTransferQuery,
} from '@kp/redux/service/transaction';
import TransactionTabs from '@kp/components/common/TransactionHistory/transactionTabs';
import {
  convertUTCToLocalTime,
  generateHTML,
  getName,
  getStatusColor,
  getStatusMessage,
  getTransactionType,
  removeCommas,
  truncateWithEllipsis,
} from '@kp/utils/helper';
import {showToast} from '@kp/utils/common';
import Share from 'react-native-share';

interface TransactionListFooterProps {
  isFetching: boolean;
}

/**
 * TransactionHistory Screen
 * - Displays the user's transaction history
 * - Allows switching between wallets and filtering transactions by date
 * - Provides functionality to download transaction history as a PDF
 * - Implements infinite scrolling for transaction fetching
 */
const TransactionHistory: React.FC<ScreenProps> = ({navigation}) => {
  const {accountType} = useAccountContext();
  const {userWallets, individualProfile, businessProfile, info} =
    useAppSelector(state => state.user);
  const profile =
    accountType == AccountType.INDIVIDUAL ? individualProfile : businessProfile;
  const type = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(
    moment().subtract(7, 'days').format('YYYY-MM-DD'),
  );
  const {wallet, setWallet} = useWalletContext();

  const [walletId, setWalletId] = useState<any>();
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [queryParams, setQueryParams] = useState({
    id: walletId,
    per_page: transactionHistorySize,
    page: page,
    start_date: startDate,
    end_date: endDate,
  });
  const [transactions, setTransactions] = useState<any>([]);
  const [showChangeWallet, setShowChangeWallet] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const {data, isLoading, isFetching} = useGetWalletTransactionQuery(
    queryParams as any,
  );

  useEffect(() => {
    const index = userWallets?.[type]?.findIndex(
      (eachWallet: any) => eachWallet.walletCurrency === wallet,
    );
    setWalletId(userWallets?.[type]?.[index ? index : 0]?.id);
    setTransactions([]);
    setPage(0);
  }, [wallet]);

  useEffect(() => {
    setPage(0);
    setTransactions([]);
    setQueryParams(prev => ({
      ...prev,
      start_date: startDate,
      end_date: endDate,
      page: 0,
    }));
  }, [startDate, endDate]);

  useEffect(() => {
    setQueryParams(prev => ({...prev, id: walletId}));
  }, [walletId]);

  const renderItem = ({item}: any) => {
    const showRed = item.side
      ? shouldShowRedTransfer(item.side, wallet)
      : shouldShowRed(item.drCr);
    const isBankTransaction =
      item.transactionType == 'Cash Out' ||
      item.transactionType == 'Money Added';
    const staticImage = isBankTransaction ? PATHS.bank : PATHS.profilePic;
    const source = item?.avatar ? {uri: item?.avatar} : staticImage;
    const dateTime = convertUTCToLocalTime(item.dateTime);
    const name = item.name ? getName(item.name) : '';
    return (
      <View id={item.id} style={styles.transactionItems}>
        {item.symbol ? (
          <ProfilePicture
            style={styles.profile}
            showFlag={true}
            type={wallet}
            source={{uri: profile.avatar}}
          />
        ) : (
          <ProfilePicture
            style={styles.profile}
            showFlag={true}
            type={item.currency}
            source={source}
          />
        )}
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textHeading}>
              {item.side
                ? getTransactionText(item.side, wallet, item.transactionType)
                : item.transactionType}
            </Text>
            {/* <View
              style={[
                styles.statusContainer,
                {backgroundColor: getStatusColor(item.status)},
              ]}> */}
            <Text
              style={[styles.statusText, {color: getStatusColor(item.status)}]}>
              {getStatusMessage(item.status)}
            </Text>
            {/* </View> */}
            <Text
              style={[
                styles.amountText,
                {
                  color: showRed ? COLOR.danger : COLOR.primary,
                },
              ]}>
              {item.currency == CARD_TYPE.NGN
                ? CARD_SYMBOL.NGN
                : CARD_SYMBOL.USD}{' '}
              {item.amount}
            </Text>
          </View>

          {item.phoneNumber !== '' && (
            <Text style={styles.textContent}>
              {name} | {item.phoneNumber}
            </Text>
          )}
          {item.phoneNumber == '' && (
            <Text style={styles.textContent}>
              {truncateWithEllipsis(item.name, 28)}
            </Text>
          )}
          <Text style={styles.textContent}>{dateTime}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (data && !isLoading && !isFetching) {
      setTransactions((prevList: any) => [...prevList, ...data.transactions]);
    }
  }, [data, isLoading, isFetching]);

  const toggleModal = () => {
    setShowDateModal(!showDateModal);
  };

  const showSourceWallet = () => {
    setShowChangeWallet(true);
  };

  const changeWallet = (value: string | undefined, id?: string) => {
    value && setWallet(CARD_TYPE[value]);
    setWalletId(id);
    setShowChangeWallet(false);
  };

  const loadMoreData = async () => {
    if (!isLoading && !isFetching && transactions.length >= 10) {
      setPage(prev => prev + 1);
    }
  };

  const downloadPDF = async () => {
    if (transactions.length > 0) {
      const {dirs} = RNFetchBlob.fs;
      const dirToSave =
        Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
      const selectedCode = transactions;
      const userName = `${info.firstName} ${info.lastName}`;
      const html = generateHTML(
        selectedCode,
        wallet,
        userName,
        startDate,
        endDate,
        wallet == CARD_TYPE.NGN ? CARD_TYPE.NGN : CARD_TYPE.USD,
      );
      const options = {
        html: html,
        fileName: 'transactions',
        directory: 'Documents',
      };
      const targetPath = `${dirToSave}/KrillPay_${Date.now()}.pdf`;
      try {
        const file = await RNHTMLtoPDF.convert(options);
        const filePath: any = file.filePath;
        await RNFetchBlob.fs.mv(filePath, targetPath);
        if (Platform.OS === 'android') {
          RNFetchBlob.android.addCompleteDownload({
            title: `KrillPay_${Date.now()}`,
            description: 'PDF Download',
            mime: 'application/pdf',
            path: targetPath,
            showNotification: true,
          });

          await RNFetchBlob.fs.scanFile([
            {
              path: targetPath,
              mime: 'application/*',
            },
          ]);
        }
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.previewDocument(targetPath);
        } else {
          showToast('File Downloaded');
        }

        // 🔥 **Trigger Native Share Dialog**
        const shareOptions = {
          title: 'Share PDF',
          message: 'Here is the PDF file',
          url: `file://${targetPath}`, // Important: use `file://` prefix
          type: 'application/pdf',
        };

        await Share.open(shareOptions);
      } catch (error) {
        console.error('Error creating PDF:', error);
      }
    }
  };

  useEffect(() => {
    if (page > 0) {
      setQueryParams(prev => ({...prev, page}));
    }
  }, [page]);

  const TransactionListFooter: React.FC<TransactionListFooterProps> = ({
    isFetching,
  }) => {
    if (isFetching) {
      return (
        <View style={{marginTop: 18}}>
          <ActivityIndicator size="small" color={COLOR.primary} />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <PopUp
        modalVisible={showDateModal}
        toggleModal={toggleModal}
        isDateModal={true}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
      />
      <Header
        title={
          showChangeWallet
            ? COMMON.selectSourceWallet
            : DRAWER_TEXT.TransactionHistory
        }
        style={[styles.header, showChangeWallet && styles.alignCenter]}
        isBackButton={!showChangeWallet}
        isLeftTitle
      />
      {!showChangeWallet && (
        <WalletButton
          type={wallet}
          onPress={showSourceWallet}
          style={styles.walletButton}
        />
      )}
      {showChangeWallet && (
        <SelectWallet type={wallet} changeWallet={changeWallet} />
      )}
      {!showChangeWallet && (
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.date}
              onPress={() => setShowDateModal(true)}>
              <Image style={styles.calendarLogo} source={PATHS.calendar} />
              <Text style={styles.text}>
                {startDate} - {endDate}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.download} onPress={downloadPDF}>
              <DownloadIcon
                strokeWidth={1.25}
                width={18}
                height={20}
                color={COLOR.black}
              />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <ActivityIndicator
              size={'large'}
              style={{marginTop: 120}}
              color={COLOR.primary}
            />
          ) : (
            <FlatList
              data={transactions}
              renderItem={renderItem}
              style={styles.transactionList}
              ListFooterComponent={
                <TransactionListFooter isFetching={isFetching} />
              }
              keyExtractor={(_, index) => index.toString()}
              onEndReachedThreshold={0.1}
              onEndReached={loadMoreData}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default TransactionHistory;
