import Header from '@kp/components/common/Header';
import {COMMON, RECIPIENT_SCREEN} from '@kp/constants/appText';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import {NavigationProp} from '@react-navigation/native';
import RecipientCard from '@kp/components/RecipientCard';
import {MAIN_NAVIGATOR} from '@kp/constants/routes';
import {useGetUserListQuery} from '@kp/redux/service/users';
import LoaderModal from '@kp/components/common/Modal/LoaderModal';
import {useEffect, useState} from 'react';
import {useWalletContext} from '@kp/context/walletType';
import {typeConversion} from '@kp/utils/helper';
import COLOR from '@kp/constants/colors';
import {useAppSelector} from '@kp/redux/slices';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';

interface Props {
  navigation: NavigationProp<any>;
  route: any;
}

interface IUserData {
  count: string;
  limit: number;
  page: number;
  totalPages: number;
}

/**
 * RecipientScreen
 * - Displays a list of recipients for transactions
 * - Allows searching and selecting a recipient
 * - Implements infinite scrolling for loading more data
 */
const RecipientScreen = ({navigation, route}: Props) => {
  const {cash, transactionCountry, selectedCountry} = route.params ?? {};
  const {wallet} = useWalletContext();
  const {accountType} = useAccountContext();
  const {individualProfile, businessProfile} = useAppSelector(
    state => state.user,
  );
  const [recipientList, setRecipientList] = useState<any>([]);
  const [userData, setUserData] = useState<IUserData>({
    count: '0',
    limit: 0,
    page: 1,
    totalPages: 0,
  });

  const [queryParams, setQueryParams] = useState({
    page: userData.page,
    size: 10,
    countryCode:
      transactionCountry == 'USD'
        ? typeConversion(transactionCountry)
        : typeConversion(wallet),
    currency: wallet,
    krillTag:
      accountType === AccountType.INDIVIDUAL
        ? individualProfile?.krillTag
        : businessProfile?.krillTag,
  });
  const {data, refetch, isLoading, isFetching} = useGetUserListQuery(
    queryParams as any,
  );
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    return () => {
      setShowLoader(false);
    };
  }, []);

  useEffect(() => {
    if (data && !isLoading && !isFetching) {
      setUserData({
        count: data.count,
        limit: data.limit,
        page: data.page,
        totalPages: data.totalPages,
      });
      setRecipientList((prevList: any) => [...prevList, ...data.users]);
    }
  }, [data, isFetching, isLoading]);

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({item}: any) => {
    return (
      <RecipientCard
        avatar={item.avatar}
        fullName={item.displayName}
        type={item.mobileCountry && typeConversion(item.mobileCountry)}
        krillTag={item.krillTag}
        mobileNumber={item.mobileNumber}
        onPress={() => onPress(item)}
      />
    );
  };

  const handleSearch = async (search: string) => {
    if (search || search !== '') {
      setRecipientList([]);
      setQueryParams(prev => ({...prev, search, page: 1}));
      await refetch();
    } else {
      setRecipientList([]);
      if ('search' in queryParams) {
        const {search, page, ...rest} = queryParams;
        const params = {...rest, page: 1};
        setQueryParams(params);
      }
    }
  };

  const onPress = (item: any) => {
    navigation.navigate(MAIN_NAVIGATOR.Review, {
      cash: cash,
      type: typeConversion(item.mobileCountry),
      avatar: item.avatar,
      accountHolder: item.displayName,
      krillTag: item.krillTag,
      mobileNumber: item.mobileNumber,
      beneficiaryWalletId: item.walletMainId,
      beneficiaryNubanNumber: item.partnerWalletId,
    });
  };

  const loadMoreData = async () => {
    if (userData.totalPages > 1 && userData.page <= userData.totalPages) {
      if (userData.page >= 1) {
        setQueryParams(prev => ({...prev, page: userData.page + 1}));
        setUserData(prev => ({...prev, page: prev.page + 1}));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onSearch={handleSearch}
        showSearch
        title={RECIPIENT_SCREEN.header}
        style={styles.header}
        isBackButton
        isLeftTitle
        goBack={goBack}
      />
      <View style={styles.recipientContainer}>
        {isFetching && !isLoading && (
          <ActivityIndicator size={'small'} color={COLOR.primary} />
        )}
        {data && !isLoading ? (
          <FlatList
            contentContainerStyle={styles.flatlistContainer}
            data={recipientList}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            onEndReachedThreshold={0.1}
            onEndReached={loadMoreData}
          />
        ) : (
          <View style={styles.noContact}>
            {!isLoading && <Text>{COMMON.contactNotFound}</Text>}
          </View>
        )}
      </View>
      <LoaderModal modalVisible={isLoading && showLoader} />
    </SafeAreaView>
  );
};

export default RecipientScreen;
