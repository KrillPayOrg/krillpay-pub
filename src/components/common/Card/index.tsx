import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import PATHS from '@kp/constants/paths';
import {CARD_IMAGES, CARD_TYPE} from '@kp/constants/appText';
import PopUp from '../Modal';
import InfoModal from './InfoModal';
import {useAccountContext} from '@kp/context/accountType';
import {AccountType} from '@kp/constants/enum';
import {getAccountText} from '@kp/utils/common';
import {getWalletBalance} from '@kp/utils/helper';
import {useAppSelector} from '@kp/redux/slices';
import CircleModal from './CircleModal';
import COLOR from '@kp/constants/colors';
import {RefreshCcwIcon} from 'lucide-react-native';

/**
 * Card Component
 * - Displays wallet information based on `type`
 * - Shows balance with refresh functionality
 * - Supports modal pop-ups for certain card types
 */
const Card: React.FC<Card> = ({
  type,
  isActiveWallet,
  style,
  walletId,
  updateWallets,
  refetchWallet,
  activeIndex,
  totalLength,
}) => {
  const {info, walletBalances, balanceLoading, transactionsLoading} =
    useAppSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const [circleModal, setCircleModal] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const {accountType} = useAccountContext();
  const profileType = accountType == AccountType.INDIVIDUAL ? 'ind' : 'bus';
  /**  wallet balance */
  const balance = getWalletBalance(
    walletBalances,
    profileType as keyof WalletBalance,
    type as keyof WalletBalance['ind'] | keyof WalletBalance['bus'],
  );
  /** Handles card press */
  const onPress = () => {
    if (type == CARD_TYPE.NGN && info.mobileCountry == 'US') {
      setOpen(prev => !prev);
    } else if (type == CARD_TYPE.USDC && info.mobileCountry == 'NG') {
      setCircleModal(prev => !prev);
    }
  };
  /** Toggles Info Modal */
  const toggleInfo = () => {
    setOpenInfo(prev => !prev);
  };

  return (
    <View style={[styles.container, style]}>
      {!isActiveWallet && (
        <>
          <PopUp
            modalVisible={open}
            toggleModal={onPress}
            toggleBVN={updateWallets}
            isBVN={true}
          />
          <CircleModal modalVisible={circleModal} toggleModal={onPress} />
        </>
      )}
      <InfoModal type={type} modalVisible={openInfo} toggleModal={toggleInfo} />
      <ImageBackground
        resizeMode="contain"
        style={styles.logo}
        source={PATHS[CARD_IMAGES[type]]}>
        {isActiveWallet && (
          <View style={styles.cardContainer}>
            <View style={styles.flexRow}>
              <View style={styles.row}>
                <Text style={styles.text}>
                  {getAccountText(accountType, type)}
                </Text>
                {/* {accountType == AccountType.INDIVIDUAL &&
                  type !== CARD_TYPE.NGN && (
                    <TouchableOpacity onPress={toggleInfo}>
                      <Image style={styles.infoIcon} source={PATHS.info} />
                    </TouchableOpacity>
                  )} */}
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.numberText, styles.currencyType]}>
                  {type == CARD_TYPE.USDC ? CARD_TYPE.USD : CARD_TYPE[type]}
                </Text>
                {!balanceLoading && !transactionsLoading && (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('pressed');
                      refetchWallet?.(true);
                    }}
                    style={{marginTop: 3}}>
                    <RefreshCcwIcon
                      size={16}
                      color={COLOR.white}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.flexRow}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 40,
                }}>
                <Image
                  style={[
                    styles.dollarSign,
                    type === CARD_TYPE.NGN && styles.ngnSign,
                  ]}
                  source={
                    type == CARD_TYPE.USDC ? PATHS[CARD_TYPE.USD] : PATHS[type]
                  }
                />
                {!(balanceLoading && (balance === 0 || balance === '0.00')) && (
                  <Text style={styles.numberText}>{balance}</Text>
                )}
                {balanceLoading && (
                  <ActivityIndicator size={'small'} color={COLOR.white} />
                )}
              </View>
            </View>
          </View>
        )}
        {!isActiveWallet && (
          <TouchableOpacity onPress={onPress} style={styles.BVNContainer}>
            <Image source={PATHS.addBVN} style={styles.addIcon} />
            <Text style={styles.blurText}>
              {type == CARD_TYPE.USDC ? CARD_TYPE.USD : CARD_TYPE[type]}
            </Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
      <View style={styles.dotContainer}>
        {Array.from({length: totalLength}).map((_, index) => {
          return (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Card;
