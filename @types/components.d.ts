type AccountType = 'business' | 'individual';
enum MethodType {
  'phone' = 'phone',
  'email' = 'email',
  'alternate_phone' = 'alternate_phone',
}
type Rotate = '0deg' | '45deg' | '90deg' | '135deg' | '180deg' | '270deg';
interface AccountCard {
  type: AccountType;
  onPress: (type: AccountType) => void;
  isActive: boolean;
  title: string;
}

interface MethodCard {
  type?: MethodType;
  onPress: (type: MethodType) => void;
  isActive: boolean;
  title: string | undefined;
  text: string;
}

interface SignupForm {
  onSubmit?: (
    vals: any,
    setShowError?: any,
    setIsLoading?: any,
    setError?: any,
  ) => void;
  shouldLoad?: boolean;
  resendButton?: boolean;
  setResendButton?: (value: boolean) => void;
  btnTitle?: string;
  Icon?: React.CElement;
  isPrivacy?: boolean;
  isLoading?: boolean;
  error?: boolean;
  showError?: boolean;
  shouldShowError?: boolean;
  bvnError?: string;
  title?: string;
  fields?: {
    isGoogle?: boolean;
    isDropdown?: boolean;
    dropDownType?: string;
    disable?: boolean;
    isSelect?: boolean;
    options?: {
      label: string;
      value: string;
    }[];
    isInfo?: boolean;
    isTextArea?: boolean;
    name: string;
    label?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    type?: 'default' | 'phone' | 'date' | 'otp';
  }[];
  validationSchema?: any;
  values?: any;
  top?: number;
  containerStyle?: any;
}

interface BVNVerifyForm {
  onSubmit?: (vals: any) => void;
}

interface LoginForm {
  isBio?: boolean;
}

interface KrillInfoModal {
  open: boolean;
  onClose: () => void;
  text: string;
  btnTitle?: string;
}

interface BVNModal {
  modalVisible: boolean;
  toggleModal: () => void;
  btnTitle?: string;
  updateStep?: (value: number) => void;
  methods?: any;
  error?: string;
  showError?: boolean;
  sessionId?: string;
  toggleBVN?: () => void;
  accountCreated?: boolean;
}

interface DownloadIcon {
  rotate?: Rotate;
}

interface QrTabs {
  setActive: (tab: number) => void;
  active: number;
  isOnHome?: boolean;
}

interface RecipientCard {
  avatar: string;
  fullName: string;
  krillTag: string;
  mobileNumber: string;
  type: 'USD' | 'USDC' | 'NGN' | 'US' | 'NG';
  onPress: () => void;
}
