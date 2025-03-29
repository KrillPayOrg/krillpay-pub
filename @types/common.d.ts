type CurrecnyType = 'USD' | 'USDC' | 'NGN' | undefined;

interface Button {
  style?: {[key: string]: any};
  title: string;
  onPress?: () => void;
  width?: string | number;
  type?: 'submit' | 'default' | 'custom';
  image?: ImageSourcePropType;
  isLoading?: boolean;
  disabled?: boolean;
  loaderColor?: string;
}

interface OutlineButton {
  rotate?: Rotate;
  Icon?: React.ComponentType<{
    rotate?: Rotate;
  }>;
}

interface TabButton {
  style?: {[key: string]: any};
  title: string;
  onPress?: () => void;
  width?: string | number;
  image?: ImageSourcePropType;
}

interface ModalProps {
  modalVisible: any;
  toggleModal: () => void;
  style?: {[key: string]: any};
  text?: string;
  isDateModal?: boolean;
  setStartDate?: (date: string) => void;
  setEndDate?: (date: string) => void;
  startDate?: string;
  endDate?: string;
  isBVN?: boolean;
  toggleBVN?: () => void;
  isVerificationModal?: boolean;
  url?: string;
  title?: string;
  row?: boolean;
  onPressConfirm?: () => void;
  message?: string;
}

interface LoaderModalProps {
  modalVisible: any;
  style?: {[key: string]: any};
}

interface InfoModal {
  modalVisible: any;
  type: string;
  toggleModal: () => void;
  style?: {[key: string]: any};
}

interface CircleModal {
  modalVisible: any;
  toggleModal: () => void;
  style?: {[key: string]: any};
}

interface SwicthButton {
  width?: number;
  height?: number;
  onChange: (val: boolean) => void;
  value?: boolean;
}

interface Header {
  title: string;
  isLeftTitle?: boolean;
  style?: {[key: string]: any};
  isHome?: boolean;
  userType?: string;
  isBackButton?: boolean;
  navigation?: any;
  isRow?: boolean;
  canShare?: boolean;
  showSearch?: boolean;
  onSearch?: (val: string) => void;
  goBack?: () => void;
  isSignUp?: boolean;
}

interface NumPad {
  style?: {[key: string]: any};
  updateCash: (value: string) => void;
}

interface DrawerItem {
  title: string;
  onPress: () => void;
}

interface Rate {
  buy: number;
  sell: number;
  locale: string;
  rateId: string;
  code: string;
}

interface TransactionHistory {
  type: any;
  isActiveWallet?: boolean;
}

interface Network {
  id: string;
  max: string;
  currency: string;
  countryCurrency: string;
  status: string;
  feeLocal: string;
  feeUSD: string;
  rampType: string;
  channelType: string;
  vendorId: string;
}

interface Bank {
  code: string;
  status: string;
  channelIds: [];
  accountNumberType: string;
  id: string;
  country: string;
  name: string;
  countryAccountNumberType: string;
}

interface BottomContainer extends Header {
  btnText?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

interface Card {
  type: string;
  style?: {[key: string]: any};
  isActiveWallet: boolean;
  activeIndex: number;
  originalId?: string;
  totalLength: number;
  // shouldLoadData: boolean;
  walletId?: string;
  updateWallets?: () => void;
  refetchWallet?: (value: boolean) => void;
}

interface Wallet {
  type?: string;
  style?: {[key: string]: any};
  isTrade?: boolean;
  changeWallet?: (val: string | undefined, id?: string) => void;
  showAmount?: boolean;
  notAllowedWallet?: string[];
}

interface WalletButton {
  type: string | undefined;
  style?: {[key: string]: any};
  onPress?: () => void;
  showAmount?: boolean;
  id?: string;
  isLoading?: boolean;
  toggleLoading?: () => void;
  setTotalBalance?: (value: number, clearValue: boolean) => void;
}

interface ButtonContainer {
  buttonWidth: number | string;
  type: string;
  isActiveWallet: boolean;
  activeIndex: number;
  haveAccount: boolean;
  walletId?: string;
  totalLength: number;
  // shouldLoadData: boolean;
  originalId?: string;
  updateWallets?: () => void;
  refetchWallet?: (value: boolean) => void;
}

interface ProfilePicture {
  style?: {[key: string]: any};
  showFlag: boolean;
  type?: 'USD' | 'USDC' | 'NGN' | 'US' | 'NG';
  source: ImageSourcePropType;
}

interface LoginPayload {
  mobileNumber: string;
  password: string;
}
interface UploadAvatarPayload {
  localUri?: string;
  fileName?: string;
  type?: string;
  accountType: string;
}

interface userWallets {
  ind:
    | {
        id: string;
        profileType: string;
        walletCurrency: string;
        partnerWalletId: string;
        status: string;
        partnerWalletName: string;
      }[]
    | null;
  bus:
    | {
        id: string;
        profileType: string;
        walletCurrency: string;
        partnerWalletId: string;
        status: string;
        partnerWalletName: string;
      }[]
    | null;
}

interface KycStatus {
  ind: string;
  bus: string;
}

interface WalletAmount {
  balance: string;
  cash: string;
}

interface WalletDetails {
  amount: WalletAmount;
  id: string;
}

interface WalletBalance {
  ind: {
    USD: WalletDetails | null;
    USDC: WalletDetails | null;
    NGN: WalletDetails | null;
  };
  bus: {
    USD: WalletDetails | null;
  };
}

interface WalletTransaction {
  transactions: any;
  id: string;
}

interface WalletTransactions {
  ind: {
    USD: WalletTransaction | null;
    USDC: WalletTransaction | null;
    NGN: WalletTransaction | null;
  };
  bus: {
    USD: WalletTransaction | null;
  };
}

interface TransactionControl {
  ind: {
    USD: boolean;
    USDC: boolean;
    NGN: boolean;
  };
  bus: {
    USD: boolean;
  };
}

interface UserSliceState {
  token: string | null;
  info: any;
  businessProfile: any;
  individualProfile: any;
  hideStatusBar: boolean;
  isFirstTime: boolean;
  transactionControl: TransactionControl;
  walletBalances: WalletBalance | null;
  walletTransactions: WalletTransactions | null;
  transactionsLoading: boolean;
  balanceLoading: boolean;
  wallets: any;
  kycStatus: KycStatus;
  userWallets: userWallets;
  refreshToken: string | null;
}

interface VerifyPin {
  pin: string;
  accountType: string;
}
interface FeildAvailable {
  krillTag: string;
  email: string;
}
interface States {
  countryCode: string;
}

interface Cities {
  countryCode: string;
  stateCode: string;
}
