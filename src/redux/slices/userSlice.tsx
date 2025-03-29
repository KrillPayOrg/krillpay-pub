import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: UserSliceState = {
  token: null,
  info: null,
  businessProfile: null,
  individualProfile: null,
  refreshToken: null,
  hideStatusBar: false,
  walletBalances: null,
  walletTransactions: null,
  transactionControl: {
    ind: {USD: false, USDC: false, NGN: false},
    bus: {USD: false},
  },
  balanceLoading: false,
  transactionsLoading: false,
  isFirstTime: false,
  wallets: null,
  kycStatus: {ind: 'UNV', bus: 'UNV'},
  userWallets: {ind: null, bus: null},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setHideStatusBar: (state, action: PayloadAction<boolean>) => {
      state.hideStatusBar = action.payload;
    },
    setIsFirstTime: (state, action: PayloadAction<boolean>) => {
      state.isFirstTime = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      const {businessDetails, individualDetails, ...restInfo} = action.payload;
      state.info = restInfo;
      state.businessProfile = businessDetails;
      state.individualProfile = individualDetails;
    },
    setTransactionControl: (state, action: PayloadAction<any>) => {
      action.payload.forEach(
        (item: {
          allowTransaction: boolean;
          code: string;
          accountType: string;
        }) => {
          if (state.transactionControl.hasOwnProperty(item.accountType)) {
            if (
              state.transactionControl[
                item.accountType as keyof TransactionControl
              ].hasOwnProperty(item.code)
            ) {
              state.transactionControl[
                item.accountType as keyof TransactionControl
              ][
                item.code as keyof TransactionControl[keyof TransactionControl]
              ] = item.allowTransaction;
            }
          }
        },
      );
    },

    updateWalletBalance: (
      state,
      action: PayloadAction<{
        type: keyof WalletBalance['ind'] | keyof WalletBalance['bus']; // Currency types like 'USD', 'USDC', 'NGN'
        result: WalletAmount; // The amount to update
        profileType: keyof WalletBalance; // 'ind' or 'bus'
        id: string; // The ID to update
      }>,
    ) => {
      const {type, result, profileType, id} = action.payload;

      // Initialize `walletBalances` if it's null
      if (state.walletBalances === null) {
        state.walletBalances = {
          ind: {
            USD: null,
            USDC: null,
            NGN: null,
          },
          bus: {
            USD: null,
          },
        };
      }

      // Update logic based on `profileType`
      const profile = state.walletBalances[profileType];

      if (profile && type in profile) {
        // Update only the specified `type` within the `profileType`
        profile[type as keyof typeof profile] = {
          amount: result,
          id,
        };
      }
    },
    updateWalletTransactions: (
      state,
      action: PayloadAction<{
        type: keyof WalletTransactions['ind'] | keyof WalletTransactions['bus']; // Keys allowed within any profile type
        result: any;
        id: string;
        profileType: keyof WalletTransactions; // 'ind' or 'bus'
      }>,
    ) => {
      const {type, result, id, profileType} = action.payload;

      // Initialize `walletTransactions` if it's null
      if (state.walletTransactions === null) {
        state.walletTransactions = {
          ind: {
            USD: null,
            USDC: null,
            NGN: null,
          },
          bus: {
            USD: null,
          },
        };
      }

      // Update logic based on `profileType`
      if (type && result && id) {
        if (profileType === 'ind' && type in state.walletTransactions.ind) {
          state.walletTransactions.ind[
            type as keyof WalletTransactions['ind']
          ] = {
            transactions: result,
            id,
          };
        } else if (
          profileType === 'bus' &&
          type in state.walletTransactions.bus
        ) {
          state.walletTransactions.bus[
            type as keyof WalletTransactions['bus']
          ] = {
            transactions: result,
            id,
          };
        }
      }
    },
    toggleBalanceLoading: (state, action: PayloadAction<boolean>) => {
      state.balanceLoading = action.payload;
    },
    toggleTransactionLoading: (state, action: PayloadAction<boolean>) => {
      state.transactionsLoading = action.payload;
    },
    loginUserState: (state, action: PayloadAction<any>) => {
      const {accessToken, refreshToken} = action.payload;
      state.token = accessToken;
      state.refreshToken = refreshToken;
    },
    setUsersWallet: (state, action: PayloadAction<any>) => {
      state.userWallets.bus = action.payload.bus;
      const wallets = [...action.payload.ind];
      if (wallets.length > 1) {
        wallets.sort((a: any, b: any) =>
          a.walletCurrency < b.walletCurrency ? 1 : -1,
        );
        const [a, b] = [...wallets];
        wallets[0] = b;
        wallets[1] = a;
      }
      state.userWallets.ind = wallets;
      state.wallets = action.payload.wallets;
    },
    setUserKycStatus: (state, action: PayloadAction<any>) => {
      state.kycStatus.ind = action.payload.individualDetails?.kycStatus;
      state.kycStatus.bus = action.payload.businessDetails?.kybStatus;
    },
    resetUserWalletAndTransaction: state => {
      state.walletBalances = null;
      state.walletTransactions = null;
      state.balanceLoading = false;
      state.transactionsLoading = false;
      state.transactionControl = {
        ind: {USD: false, USDC: false, NGN: false},
        bus: {USD: false},
      };
    },
    logoutUser: state => {
      state.businessProfile = null;
      state.individualProfile = null;
      state.refreshToken = null;
      state.wallets = null;
      state.userWallets = {ind: null, bus: null};
      state.info = null;
      state.token = null;
      state.balanceLoading = false;
      state.transactionsLoading = false;
      state.transactionControl = {
        ind: {USD: false, USDC: false, NGN: false},
        bus: {USD: false},
      };
      state.refreshToken = null;
      state.walletBalances = null;
      state.walletTransactions = null;
    },
  },
});

export const {
  setToken,
  loginUserState,
  logoutUser,
  setUserInfo,
  setTransactionControl,
  setUsersWallet,
  setUserKycStatus,
  setIsFirstTime,
  setHideStatusBar,
  updateWalletBalance,
  toggleBalanceLoading,
  toggleTransactionLoading,
  updateWalletTransactions,
  resetUserWalletAndTransaction,
} = userSlice.actions;

export default userSlice.reducer;
