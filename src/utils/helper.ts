import {Dimensions, PermissionsAndroid, Platform} from 'react-native';
import {
  getTransactionText,
  shouldShowRed,
  shouldShowRedTransfer,
} from './transaction';
import {
  CARD_SYMBOL,
  CARD_TYPE,
  COMMON,
  MAP_REASON_VALUES,
} from '@kp/constants/appText';
import moment from 'moment';
import {AccountType} from '@kp/constants/enum';
import COLOR, {colorWithOpacity} from '@kp/constants/colors';
import {
  BusinessSignUp,
  IndividualNigerianSignUp,
  IndividualSignUp,
  LoggedInBusinessSignUp,
  LoggedInIndividualSignUp,
} from '@kp/validations/auth';
import PATHS from '@kp/constants/paths';

const {height} = Dimensions.get('screen');
export const queryGenerator = (
  url: string,
  method: string,
  body?: any,
  params?: any,
) => ({
  url: url,
  method: method,
  body: body,
  params: params,
});

export async function requestStoragePermission() {
  if (Platform.OS !== 'android') return true;

  try {
    if (Platform.Version < 29) {
      // Android 9 (API 28) and below require explicit storage permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to save images.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // Android 10+ (Scoped Storage) doesn't require WRITE_EXTERNAL_STORAGE
      return true;
    }
  } catch (error) {
    console.warn('Permission error:', error);
    return false;
  }
}

export const getVerificationStatus = (status?: string): boolean => {
  return status === 'VER';
};

export const getDisplayText = (country: any, wallet: string) => {
  if (!country) {
    return wallet === CARD_TYPE.USDC ? COMMON.bank : COMMON.nigeria;
  }
  return COMMON.user;
};

export const getWalletBalance = (
  walletBalances: WalletBalance | null,
  profileType: keyof WalletBalance, // 'ind' or 'bus'
  type: keyof WalletBalance['ind'] | keyof WalletBalance['bus'], // 'USD', 'USDC', 'NGN'
) => {
  // Check if walletBalances or the specific profileType is null
  if (!walletBalances || !walletBalances[profileType]) {
    return formatCash(0); // Return 0 if walletBalances or profileType is null
  }

  const profile = walletBalances[profileType];

  // Safely check if the specific type exists in the profile
  if (profile && type in profile) {
    const walletDetails = profile[type as keyof typeof profile];
    const balance = walletDetails?.amount?.balance;

    return formatCash(balance) || formatCash(0); // Return balance if available, otherwise 0
  }

  return formatCash(0); // Return 0 if the type does not exist or balance is invalid
};

export const getTotalBalance = (
  walletBalances: WalletBalance | null,
  profileType: keyof WalletBalance, // 'ind' or 'bus'
) => {
  let totalCashInUSD = 0;

  if (!walletBalances || !walletBalances[profileType]) {
    return formatCash(0); // Return 0 if walletBalances or profileType is null
  }

  const profile = walletBalances[profileType];

  for (const key in profile) {
    const walletDetails = profile[key as keyof typeof profile];

    // If there's WalletDetails for the current currency
    if (walletDetails && walletDetails.amount?.cash) {
      const cash = walletDetails.amount.cash;

      // If the currency is NGN, convert it to USD
      if (key === 'NGN') {
        totalCashInUSD += parseFloat(getUSDFromNaira(cash));
      } else {
        // For USD and USDC, just add the cash as is
        totalCashInUSD += parseFloat(cash);
      }
    }
  }

  // Format the total cash in USD
  const cash = formatCash(totalCashInUSD);
  return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getWalletCashInDefaultCurrency = (
  walletBalances: WalletBalance | null,
  profileType: keyof WalletBalance, // 'ind' or 'bus'
  type: keyof WalletBalance['ind'] | keyof WalletBalance['bus'], // 'USD', 'USDC', 'NGN'
) => {
  // Check if walletBalances or the specific profileType is null
  if (!walletBalances || !walletBalances[profileType]) {
    return formatCash(0); // Return 0 if walletBalances or profileType is null
  }

  const profile = walletBalances[profileType];

  // Safely check if the specific type exists in the profile
  if (profile && type in profile) {
    const walletDetails = profile[type as keyof typeof profile];
    const cash = walletDetails?.amount?.cash;

    // Convert to USD if the currency is NGN, otherwise return the cash as is
    if (type === 'NGN' && cash) {
      return formatCash(cash) || formatCash(0);
    }

    return formatCash(cash) || formatCash(0);
  }

  return formatCash(0); // Return 0 if the type does not exist or cash is invalid
};

export const getTotalBalanceNGN = (
  walletBalances: WalletBalance | null,
  profileType: keyof WalletBalance, // 'ind' or 'bus'
) => {
  let totalCashInNGN = 0;

  if (!walletBalances || !walletBalances[profileType]) {
    return formatCash(0); // Return 0 if walletBalances or profileType is null
  }

  const profile = walletBalances[profileType];

  for (const key in profile) {
    const walletDetails = profile[key as keyof typeof profile];

    // If there's WalletDetails for the current currency
    if (walletDetails && walletDetails.amount?.cash) {
      const cash = walletDetails.amount.cash;

      // Add only NGN cash to the total
      if (key === 'NGN') {
        totalCashInNGN += parseFloat(cash);
      }
    }
  }

  // Format the total cash in NGN
  const cash = formatCash(totalCashInNGN);
  return cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getWalletCash = (
  walletBalances: WalletBalance | null,
  profileType: keyof WalletBalance, // 'ind' or 'bus'
  type: keyof WalletBalance['ind'] | keyof WalletBalance['bus'], // 'USD', 'USDC', 'NGN'
) => {
  // Check if walletBalances or the specific profileType is null
  if (!walletBalances || !walletBalances[profileType]) {
    return formatCash(0); // Return 0 if walletBalances or profileType is null
  }

  const profile = walletBalances[profileType];

  // Safely check if the specific type exists in the profile
  if (profile && type in profile) {
    const walletDetails = profile[type as keyof typeof profile];
    const cash = walletDetails?.amount?.cash;

    // Convert to USD if the currency is NGN, otherwise return the cash as is
    if (type === 'NGN' && cash) {
      return getUSDFromNaira(cash) || formatCash(0);
    }

    return formatCash(cash) || formatCash(0);
  }

  return formatCash(0); // Return 0 if the type does not exist or cash is invalid
};

export const getWalletTransaction = (
  walletTransactions: WalletTransactions | null,
  profileType: keyof WalletTransactions, // 'ind' or 'bus'
  type: keyof WalletTransactions['ind'] | keyof WalletTransactions['bus'], // 'USD', 'USDC', 'NGN'
) => {
  // Check if walletTransactions or the specific profileType is null
  if (!walletTransactions || !walletTransactions[profileType]) {
    return undefined; // Return undefined if walletTransactions or profileType is null
  }

  const profile = walletTransactions[profileType];

  // Safely check if the `type` exists in the selected `profileType`
  if (profile && type in profile) {
    return profile[type as keyof typeof profile]?.transactions || [];
  }

  return undefined; // Return undefined if the type does not exist in the profile
};

export const getAccountControls = (accountData: any, type: string) => {
  return accountData
    .filter((account: any) => account.accountTypeDetails.code === 'IND')
    .map((account: any) => ({
      allowTransaction: account.allowTransaction,
      code: account.currencyDetails.code,
    }));
};

export const getWalletByCurrencyAndProfile = (
  userWallets: any,
  walletCurrency: string,
  profileType: string,
) => {
  const wallets = userWallets[profileType.toLowerCase()];

  if (!wallets) {
    throw new Error(`Invalid profileType: ${profileType}`);
  }

  return wallets.filter(
    (wallet: any) => wallet.walletCurrency === walletCurrency,
  );
};

export const getSignUpSchema = (
  type: AccountType,
  country: string,
  step: number,
  isLoggedIn: boolean,
) => {
  if (isLoggedIn) {
    if (type === AccountType.BUSINESS) {
      return LoggedInIndividualSignUp[step - 1];
    } else {
      return LoggedInBusinessSignUp[step - 1];
    }
  } else {
    if (type === AccountType.BUSINESS) {
      return BusinessSignUp[step - 1];
    } else if (country === 'US') {
      return IndividualSignUp[step - 1];
    } else {
      return IndividualNigerianSignUp[step - 1];
    }
  }
};

export const getWalletIdFromTransactions = (
  walletTransactions: WalletTransactions | null,
  profileType: keyof WalletTransactions, // 'ind' or 'bus'
  type: keyof WalletTransactions['ind'] | keyof WalletTransactions['bus'], // 'USD', 'USDC', 'NGN'
) => {
  // Check if walletTransactions or the specific profileType is null
  if (!walletTransactions || !walletTransactions[profileType]) {
    return undefined; // Return undefined if walletTransactions or profileType is null
  }

  const profile = walletTransactions[profileType];

  // Safely check if the `type` exists in the selected `profileType`
  if (profile && type in profile) {
    return profile[type as keyof typeof profile]?.id || undefined;
  }

  return undefined; // Return undefined if the type does not exist in the profile
};

export const getTransactionType = (
  symbol: string | undefined,
  showRed: boolean,
  transactionType: string,
) => {
  if (symbol) {
    return showRed ? 'Sell' : 'Buy';
  }
  return transactionType;
};

export const calculateAmount = (cash: string, wallet: string): string => {
  if (wallet === CARD_TYPE.NGN) {
    return parseFloat(cash).toFixed(2);
  } else if (cash) {
    return (parseFloat(cash) * 1588).toFixed(2);
  }
  return '0.00';
};

export const getUserType = (
  data: {userType: string},
  accountType: AccountType,
): string => {
  if (data.userType === 'BUS') {
    return 'bus';
  } else if (data.userType === 'IND') {
    return 'ind';
  } else if (accountType === AccountType.INDIVIDUAL) {
    return 'ind';
  } else {
    return 'bus';
  }
};

export const getUSDFromNaira = (naira: string) => {
  return (parseFloat(naira) / 1406.7).toFixed(2);
};

export const getFontSize = (cash: string) => {
  const maxFontSize = 22;
  const minFontSize = 16;
  const maxLength = 6;

  const length = cash.length;
  // If the length exceeds the threshold, set to minimum font size
  if (length >= maxLength) {
    return minFontSize;
  }

  // Linearly calculate the font size between max and min
  const fontSize =
    maxFontSize - (length / maxLength) * (maxFontSize - minFontSize);

  return Math.max(minFontSize, Math.min(maxFontSize, fontSize));
};

export const typeConversion = (type: string) => {
  switch (type) {
    case 'USDC':
      return 'US,NG';
    case 'US':
      return 'USD';
    case 'NG':
      return 'NGN';
    case 'NGN':
      return 'US,NG';
    case 'USD':
      return 'US';
  }
};
export const truncateWithEllipsis = (str: any, maxLength: any) => {
  if (str?.length <= maxLength) {
    return str;
  } else {
    if (str) {
      return str.substring(0, maxLength) + '...';
    }
  }
};
export const formatCash = (value: any) => {
  const splitCashed = `${value}`.split('.');
  if (splitCashed.length > 0 && splitCashed[1] !== undefined) {
    const formattedValue = `${splitCashed[0]}.${splitCashed[1].substring(
      0,
      2,
    )}`;
    return formattedValue;
  } else {
    return value;
  }
};

export const isSmallDevice = () => {
  return height <= 800;
};

export const removeCommas = (str: string) => {
  return str.replace(/,/g, '');
};

export const getStatusMessage = (status: string) => {
  const trueState = status.toLocaleLowerCase();
  switch (trueState) {
    case 'success':
      return 'Completed';
    case 'completed':
      return 'Completed';
    case 'initiated':
      return 'Initiated';
    case 'pending':
      return 'Processing';
    case 'failed':
      return 'Failed';
    default:
      return 'Failed';
  }
};

export const getStatusColor = (status: string) => {
  const trueState = status.toLocaleLowerCase();
  switch (trueState) {
    case 'success':
      return COLOR.darkGreen;
    case 'completed':
      return COLOR.darkGreen;
    case 'initiated':
      return colorWithOpacity(COLOR.lightBlue, 0.75);
    case 'pending':
      return colorWithOpacity(COLOR.mediumYellow, 0.75);
    case 'failed':
      return colorWithOpacity(COLOR.darkRed, 0.75);
    default:
      return colorWithOpacity(COLOR.darkRed, 0.75);
  }
};

export const getName = (str: string) => {
  return str.length > 16 ? str.slice(0, 16) + '...' : str;
};

export const generateHTML = (
  transactions: any,
  wallet: any,
  profile: any,
  startDate: string,
  endDate: string,
  currency: string,
) => {
  const getHTMLForRow = (item: any) => {
    const showRed = item.side
      ? shouldShowRedTransfer(item.side, wallet)
      : shouldShowRed(item.drCr);
    const name = item.name ? getName(item.name) : '';
    const dateTime = item.dateTime && convertUTCToLocalTime(item.dateTime);
    const backgroundColor = item.status && getStatusColor(item.status);
    const statusText = item.status && getStatusMessage(item.status);
    const amount = parseFloat(removeCommas(item.amount)).toFixed(2);
    const currencySymbol =
      item.currency === CARD_TYPE.NGN ? CARD_SYMBOL.NGN : CARD_SYMBOL.USD;
      const reason = item.reason === '' ? 'None' : MAP_REASON_VALUES[item.reason];

    return `
      <tr>
        <td>${dateTime}</td>
        <td>
          ${
            item.side
              ? getTransactionText(item.side, wallet, item.transactionType)
              : item.transactionType
          }
          ${name ? ` | ${name}` : ''}
          ${item.phoneNumber ? ` | ${item.phoneNumber}` : ''}
        </td>
         <td style="color:${backgroundColor}; text-align: center;">
          ${statusText}
        </td>
        <td style="color: ${showRed ? 'red' : 'green'};">
          ${currencySymbol} ${amount}
        </td>
        <td style=" text-align: center;">
           ${reason}
        </td>
      </tr>
    `;
  };

  return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 16px;
          }
          .container {
            max-width: 100%;
            margin: 0 auto;
          }
          table {
            font-family: Arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            table-layout: fixed; /* Ensures table fits within the width */
            word-wrap: break-word;
          }
          th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            font-size: 12px; /* Adjust font size for PDF rendering */
          }
          th {
            background-color: #25D0B9;
            color: white;
          }
          img {
            max-width: 75px;
            height: auto;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <img src="https://d6xhior9byoda.cloudfront.net/logo.png" alt="Logo"/>
              <div class="title">
                <h2 style="color: brown; font-size: 20px;">Transaction Activity</h2>
              </div>
            </div>
          </header>
          <div style="display: flex; justify-content: space-between;">
            <div>
              <p><strong>User: ${profile}</strong></p>
              <p><strong>Currency: ${currency}</strong></p>
            </div>
            <div>
              <p><strong>From Date: ${convertUTCToLocalHours(
                startDate,
              )}</strong></p>
              <p><strong>To Date: ${convertUTCToLocalHours(
                endDate,
              )}</strong></p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              ${transactions.map((item: any) => getHTMLForRow(item)).join('')}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  `;
};

export const convertUTCToLocalTime = (utcDateString: string) => {
  // Parse the UTC date string, convert to local time, and format to desired format
  const localTime = moment
    .utc(utcDateString)
    .local()
    .format('MMM. D, YYYY [at] h:mm a'); // Format to "Dec. 17, 2024 at 6:36 pm"

  return localTime;
};

export const convertUTCToLocalHours = (utcDateString: string) => {
  // Parse the UTC date string, convert to local time, and format to desired format
  const localTime = moment.utc(utcDateString).local().format('MMM. D, YYYY'); // Format to "Dec. 17, 2024 at 6:36 pm"

  return localTime;
};

// const verifyToken = (token: string) => {
//     return new Promise(async (resolve, reject) => {
//       if (!getBaseUrl('users')) {
//         reject(new Error(errors.AUTH_ERROR_MESSAGE))
//       }
//       try {
//         const config = {
//           method: 'post',
//           maxBodyLength: Infinity,
//           url: `${getBaseUrl('users')}${ACCESS_TOKEN_VERIFY}`,
//           data: { refreshToken: token },
//         }

//         const res = await axios.request(config)
//         if (res.data) {
//           resolve(res.data)
//         } else {
//           reject(new Error(errors.AUTH_ERROR_MESSAGE))
//         }
//       } catch (error) {
//         reject(error)
//       }
//     })

export const handleError = (error: any): string => {
  console.log(error, 'Error Object');

  if (typeof error === 'string') {
    if (error.includes('Please Login Again, Session Expired')) {
      return 'Session Expired. Please log in again.';
    } else {
      return error;
    }
  } else if (error.code === 'ERR_NETWORK') {
    return 'Network Request Failed, Check Your Internet Connection';
  } else if (error.response?.data?.message) {
    return error.response.data.message;
  } else if (error.response?.message) {
    return error.response.message;
  } else if (error.message) {
    return error.message;
  } else {
    return 'Something Went Wrong!';
  }
};
export function getInitials(fullName: string) {
  if (!fullName) return '';
  // Remove extra spaces and split the name into parts
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return '';
 
  // Get the first letter of the first part and the last part
  const firstInitial = parts[0].charAt(0).toUpperCase();
  const lastInitial =
    parts.length > 1 ? parts[parts.length - 1].charAt(0).toUpperCase() : '';
 
  return firstInitial + lastInitial;
}
