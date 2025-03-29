import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import styles from './style';
import Header from '@kp/components/common/Header';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {CARD_TYPE, COMMON} from '@kp/constants/appText';
import TransactionHistory from '@kp/components/common/TransactionHistory';
import {SafeAreaView} from 'react-native-safe-area-context';
import PopUp from '@kp/components/common/Modal';
import {useAccountContext} from '@kp/context/accountType';
import {useWalletContext} from '@kp/context/walletType';
import {useFocusEffect} from '@react-navigation/native';
import CardContainer from '@kp/components/common/CarousalContainers/USDScreen';
import {
  useGetUserInfoQuery,
  useGetUserWalletQuery,
  useLazyGetUserTransactionControlQuery,
} from '@kp/redux/service/users';
import {
  setUserInfo,
  setUsersWallet,
  updateWalletBalance,
  toggleBalanceLoading,
  toggleTransactionLoading,
  updateWalletTransactions,
  setTransactionControl,
} from '@kp/redux/slices/userSlice';
import {AccountType} from '@kp/constants/enum';
import {useAppDispatch, useAppSelector} from '@kp/redux/slices';
import COLOR from '@kp/constants/colors';
import {processWallets, processWalletsBusiness} from '@kp/utils/common';
import {getAccountControls, getUserType} from '@kp/utils/helper';
import {
  useLazyGetWalletBalanceQuery,
  useLazyGetWalletTransactionQuery,
} from '@kp/redux/service/transaction';
import {homeScreen} from '@kp/constants';
import UpdateModal from '@kp/components/common/Modal/UpdateModal';
import {checkVersion} from 'react-native-check-version';
const {width, height} = Dimensions.get('screen');

/**
 * HomeScreen
 * - Main screen displaying user wallet details and transactions.
 * - Fetches user data, wallet balances, and transaction history.
 * - Handles carousel navigation for multiple wallets.
 */
const HomeScreen = (props: {navigation: any}) => {
  const {data, isLoading} = useGetUserInfoQuery(null);
  const {transactionControl} = useAppSelector(state => state.user);
  const {
    data: walletData,
    isLoading: walletLoading,
    refetch: walletRefetch,
    isFetching: walletRefetching,
  } = useGetUserWalletQuery(null);
  const [getWalletBalance] = useLazyGetWalletBalanceQuery();
  const [getWalletTransaction] = useLazyGetWalletTransactionQuery();
  const [getUserTransactionControl] = useLazyGetUserTransactionControlQuery();

  const dispatch = useAppDispatch();
  const ref = React.useRef<ICarouselInstance>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const {wallet, setWallet} = useWalletContext();
  const {accountType, setAccountType} = useAccountContext();
  const [userName, setUserName] = useState('');
  const [userWallets, setUserWallets] = useState<any>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [refetchWalletData, setRefetechWalletData] = useState(true);
  const [profileChangeLoading, setProfileChangeLoading] = useState(false);

  const [isActiveWallet, setIsActiveWallet] = useState(false);
  const buttonWidth = 80;

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.container}>
        <CardContainer
          type={item.walletCurrency}
          walletId={item.id}
          activeIndex={activeIndex}
          totalLength={userWallets.length}
          originalId={item.walletId}
          refetchWallet={setRefetechWalletData}
          buttonWidth={buttonWidth}
          updateWallets={toggleActiveWallet}
          isActiveWallet={item.status == 'SUC' || item.status == 'FAI'}
          haveAccount={
            item.walletCurrency == CARD_TYPE.NGN ? item.partnerBankId : true
          }
        />
        <View style={styles.transactionContainer}>
          <TransactionHistory
            type={wallet}
            isActiveWallet={userWallets[activeIndex]?.status == 'SUC'}
          />
        </View>
      </View>
    );
  };

  const toggleUpdateModal = () => {
    setShowUpdateModal(prev => !prev);
  };

  const shouldUpdateApp = async () => {
    const version = await checkVersion();
    if (version.needsUpdate) {
      setShowUpdateModal(true);
    }
  };

  useEffect(() => {
    shouldUpdateApp();

    return () => {
      setShowUpdateModal(false);
    };
  }, []);

  useEffect(() => {
    setUserWallets(null);
    if (
      !walletLoading &&
      walletData &&
      !isLoading &&
      data &&
      !walletRefetching &&
      transactionControl
    ) {
      dispatch(setUsersWallet(walletData));
      const type = getUserType(data, accountType);
      if (type == 'bus') {
        const wallets = [...walletData[type]];
        if (accountType == AccountType.INDIVIDUAL) {
          setAccountType(AccountType.BUSINESS);
        }
        const homePageWallets = processWalletsBusiness(
          wallets,
          transactionControl['bus'],
        );
        setUserWallets(homePageWallets);
      } else {
        const wallets = [...walletData[type]];
        const homePageWallets = processWallets(
          wallets,
          data.mobileCountry,
          transactionControl['ind'],
        );
        setUserWallets(homePageWallets);
        const wallet =
          data.mobileCountry == 'US' ? CARD_TYPE.USD : CARD_TYPE.NGN;
        setWallet(wallet);
      }
      setProfileChangeLoading(false);
    }
  }, [
    walletData,
    walletLoading,
    accountType,
    isLoading,
    walletRefetching,
    transactionControl,
  ]);

  const fetchWalletBalances = async (
    id: string,
    type: keyof WalletBalance['ind'] | keyof WalletBalance['bus'],
    profileType: keyof WalletBalance,
  ) => {
    try {
      const result = await getWalletBalance(id).unwrap();
      dispatch(
        updateWalletBalance({
          type: type,
          result: result,
          id: id,
          profileType,
        }),
      );
    } catch (error) {
      console.log(error, 'errr');
    }
  };

  const getWalletBalances = async (wallets: any) => {
    dispatch(toggleBalanceLoading(true));
    await Promise.allSettled(
      wallets.map(async (wallet: any) => {
        try {
          const walletProfileType =
            accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';
          await fetchWalletBalances(
            wallet.id,
            wallet.walletCurrency,
            walletProfileType,
          );
        } catch (error) {
          console.error(
            `Error fetching wallet balance for wallet ID ${wallet.id}:`,
            error,
          );
        }
      }),
    );
    dispatch(toggleBalanceLoading(false));
  };

  const fetchWalletTransactions = async (
    id: string,
    type: keyof WalletTransactions['ind'] | keyof WalletTransactions['bus'],
    profileType: keyof WalletTransactions,
  ) => {
    try {
      const result = await getWalletTransaction({
        id: id,
        per_page: homeScreen.transactionSize,
      }).unwrap();
      dispatch(
        updateWalletTransactions({
          type: type,
          result: result.transactions,
          id: id,
          profileType,
        }),
      );
    } catch (error) {
      console.log(error, 'errr');
    }
  };

  const getWalletTransactions = async (wallets: any) => {
    dispatch(toggleTransactionLoading(true));
    await Promise.allSettled(
      wallets.map(async (wallet: any) => {
        try {
          const walletProfileType =
            accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';
          await fetchWalletTransactions(
            wallet.id,
            wallet.walletCurrency,
            walletProfileType,
          );
        } catch (error) {
          console.error(
            `Error fetching wallet transactions for wallet ID ${wallet.id}:`,
            error,
          );
        }
      }),
    );
    dispatch(toggleTransactionLoading(false));
  };

  useFocusEffect(
    useCallback(() => {
      // Your code to run when this screen is focused

      if (userWallets && userWallets.length > 0) {
        getWalletBalances(userWallets);
        getWalletTransactions(userWallets);
      }

      if (refetchWalletData) {
        setRefetechWalletData(false);
      }

      if (userWallets) {
        console.log(userWallets.length, 'lenght===>');
        /// show modal if lenght === 0
      }

      // Return a cleanup function (optional)
      return () => {
        console.log('Home screen unfocused!');
      };
    }, [userWallets, refetchWalletData]),
  );

  const onItemChange = (index: number) => {
    setWallet(CARD_TYPE[userWallets[index].walletCurrency]);
    setActiveIndex(index);
  };

  const toggleActiveWallet = () => {
    setIsActiveWallet(prev => !prev);
  };

  useEffect(() => {
    walletRefetch();
  }, [isActiveWallet]);

  React.useEffect(() => {
    if (data) {
      const wallet = data.mobileCountry == 'US' ? CARD_TYPE.USD : CARD_TYPE.NGN;
      setWallet(wallet);
    }

    ref.current?.scrollTo({index: 0});
  }, [data, accountType, userWallets]);

  const toggleVerificationModal = () => {
    setShowVerificationModal(prev => !prev);
  };

  const getTransactionControls = async () => {
    try {
      const result = await getUserTransactionControl(null).unwrap();
      const data = getAccountControls(
        result,
        accountType == AccountType.INDIVIDUAL ? 'IND' : 'BUS',
      );
      dispatch(
        setTransactionControl(
          data.map((item: any) => ({
            ...item,
            accountType: accountType === AccountType.INDIVIDUAL ? 'ind' : 'bus',
          })),
        ),
      );
    } catch (error) {
      console.log(error, 'errr');
    }
  };

  useEffect(() => {
    if (data && !isLoading) {
      setProfileChangeLoading(true);
      getTransactionControls();
      dispatch(setUserInfo(data));
    }
  }, [data, isLoading, accountType]);

  useEffect(() => {
    if (!isLoading && data) {
      accountType == AccountType.INDIVIDUAL
        ? setUserName(`${data?.firstName} ${data?.lastName}`)
        : setUserName(data?.businessDetails?.displayName);
    }
  }, [accountType, data, isLoading]);

  useFocusEffect(
    React.useCallback(() => {
      const index =
        userWallets &&
        userWallets.findIndex(
          (eachWallet: any) => eachWallet.walletCurrency === wallet,
        );
      ref.current?.scrollTo({index: index});
      return () => {};
    }, [wallet]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <PopUp
        modalVisible={showVerificationModal}
        toggleModal={toggleVerificationModal}
        isVerificationModal={true}
      />
      <UpdateModal
        modalVisible={showUpdateModal}
        toggleModal={toggleUpdateModal}
        text={COMMON.updateAppText}
      />
      <Header
        title={userName}
        isHome={true}
        userType={data?.userType}
        style={styles.header}
        navigation={props.navigation}
      />
      {walletData && userWallets && !walletLoading && !profileChangeLoading ? (
        <View style={styles.carouselContainer}>
          <Carousel
            width={width}
            // height={height > 700 ? height * 0.37 : height * 0.43}
            height={height}
            loop={false}
            ref={ref}
            style={styles.carousalStyle}
            data={userWallets}
            onSnapToItem={onItemChange}
            renderItem={renderItem}
            onConfigurePanGesture={gestureChain => {
              'worklet';
              gestureChain.activeOffsetX([-5, 5]);
              gestureChain.failOffsetY([-20, 20]);
            }}
          />
        </View>
      ) : (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: 50}}
          color={COLOR.primary}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
