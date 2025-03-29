import {CARD_TYPE, COMMON} from '@kp/constants/appText';
import {AccountType} from '@kp/constants/enum';
import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-clipboard/clipboard';
import {MMKV} from 'react-native-mmkv';
import {StorageTypeEnum} from '../../@types/enum';
import {setMobileNumber} from './login';

export const storage = new MMKV();

export const getAccountText = (accountType: string, cardType: string) => {
  let accountText;

  if (accountType == AccountType.INDIVIDUAL) {
    if (cardType == CARD_TYPE.USD) {
      accountText = COMMON.usdCash;
    } else if (cardType == CARD_TYPE.NGN) {
      accountText = COMMON.nairaWallet;
    } else {
      accountText = COMMON.usdWallet;
    }
  } else {
    accountText = COMMON.businessCash;
  }

  return accountText;
};

export const showToast = (message: string) => {
  Toast.show(message, Toast.LONG, {
    tapToDismissEnabled: true,
  });
};
export const copyToClipboard = (value: string) => {
  Clipboard.setString(value);
  showToast('copied to clipboard');
};

export const setStorageValue = (
  key: string,
  value: string | boolean | number | object,
): void => {
  if (typeof value === 'object') storage.set(key, JSON.stringify(value));
  else storage.set(key, value);
};
export const getStorageValue = (key: string, type: StorageTypeEnum): any => {
  try {
    switch (type) {
      case StorageTypeEnum.String:
        return storage.getString(key) || null;

      case StorageTypeEnum.Number:
        const numberValue = storage.getNumber(key);
        return numberValue === null ? null : numberValue;

      case StorageTypeEnum.Boolean:
        const booleanValue = storage.getBoolean(key);
        return booleanValue === null ? null : booleanValue;

      case StorageTypeEnum.Object:
        const jsonString = storage.getString(key);
        return jsonString ? JSON.parse(jsonString) : null;

      default:
        return null;
    }
  } catch (error) {
    console.error('Error retrieving or parsing storage value:', error);
    return null;
  }
};

export const deleteStorageValue = (key: string) => {
  storage.delete(key);
};
export const checkKycStatus = (status: string) => {
  return status == 'UNV' ? true : false;
};

export const isUserVerified = (status: string) => {
  return status == 'VER' ? true : false;
};

export const isUserRejected = (status: string) => {
  return status == 'REJ' ? true : false;
};

export const mapProfileData = (type: AccountType, data: any) => {
  if (type == AccountType.INDIVIDUAL) {
    const result = {
      firstName: data.firstName,
      avatar: data.avatar,
      lastName: data.lastName,
      email: data.email,
      mobileNumber: data.mobileNumber,
      krillTag: data.individualDetails?.krillTag || '',
      addressLine1: data.individualDetails?.addressLine1 || '',
      addressLine2: data.individualDetails?.addressLine2 || '',
      dob: data.individualDetails?.dob || '',
      country: data.individualDetails?.country || '',
    };
    return result;
  } else {
    const result = {
      firstName: data.firstName,
      avatar: data.avatar,
      lastName: data.lastName,
      email: data.email,
      mobileNumber: data.mobileNumber,
      krillTag: data.businessDetails?.krillTag || '',
      addressLine1: data.businessDetails?.addressLine1 || '',
      addressLine2: data.businessDetails?.addressLine2 || '',
      dob: data.businessDetails?.dob || '',
      country: data.businessDetails?.country || '',
    };
    return result;
  }
};

export const generateBodyForReset = (value: any, info: any) => {
  console.log(value, 'valllss');
  if (value.newPhone) {
    return {mobileNumber: setMobileNumber(value.mobileCountry, value.newPhone)};
  } else if (value.newEmail) {
    return {email: value.newEmail};
  } else if (value.newPassword) {
    return {
      oldPassword: value.currentPassword,
      password: value.newPassword,
    };
  }
};

export const getTimestampOfYears = (value: any) => {
  return value * 365 * 24 * 60 * 60 * 1000;
};

export const processWalletsBusiness = (
  wallet: any,
  transactionControl: any,
) => {
  // Deep copy the apiResponse to avoid mutating the original data
  const data = JSON.parse(JSON.stringify(wallet));

  const filteredData = data.filter((wallet: any) => {
    return transactionControl[wallet.walletCurrency] === true;
  });

  return filteredData;
};

export const processWallets = (
  wallet: any,
  userType: any,
  transactionControl: any,
) => {
  // Deep copy the apiResponse to avoid mutating the original data
  const data = JSON.parse(JSON.stringify(wallet));

  // Initialize a set of wallet currencies present in the response
  const walletCurrencies = new Set(
    data.map((wallet: any) => wallet.walletCurrency),
  );
  // Check user type and add necessary wallet objects
  if (userType === 'US') {
    // Case 1: US user type, ensure NGN wallet if not present
    if (!walletCurrencies.has('NGN')) {
      data.push({walletCurrency: 'NGN', status: 'NINI'});
    }
    // Define the order of the currencies
    const order: {[key: string]: number} = {USD: 1, USDC: 2, NGN: 3};

    // Sort the data according to the defined order
    data.sort((a: any, b: any) => {
      const orderA = order[a.walletCurrency] || 4; // Default to 4 if not in order object
      const orderB = order[b.walletCurrency] || 4; // Default to 4 if not in order object
      return orderA - orderB;
    });
  } else if (userType === 'NG') {
    // Case 2: NG user type, ensure USDC wallet if not present
    // if (!walletCurrencies.has('USDC')) {
    //   data.push({walletCurrency: 'USDC', status: 'NINI'});
    // }
    // Define the order of the currencies
    const order: {[key: string]: number} = {NGN: 1, USDC: 2};

    // Sort the data according to the defined order
    data.sort((a: any, b: any) => {
      const orderA = order[a.walletCurrency] || 3; // Default to 4 if not in order object
      const orderB = order[b.walletCurrency] || 3; // Default to 4 if not in order object
      return orderA - orderB;
    });
  }

  const filteredData = data.filter((wallet: any) => {
    return transactionControl[wallet.walletCurrency] === true;
  });

  return filteredData;
};

export const filterObjectsByCountry = (data: any, userCountry: string) => {
  const countryCurrencyMap: {[key: string]: string[]} = {
    US: ['USD', 'NGN'],
    NG: ['NGN'],
  };

  const targetCurrencies = countryCurrencyMap[userCountry];
  if (!targetCurrencies) return null;

  return data.filter((item: any) =>
    targetCurrencies.includes(item.walletCurrency),
  );
};

export const hasRequiredKeys = (obj: any) => {
  const requiredKeys = [
    'type',
    'avatar',
    'accountHolder',
    'krillTag',
    'mobileNumber',
    'UsWalletId',
    'UsWalletNubanNumber',
    'ngnWalletId',
    'ngnWalletNubanNumber',
  ];
  const objKeys = Object.keys(obj);
  // Check if the object has t he exact number of required keys
  if (objKeys.length !== requiredKeys.length) {
    return false;
  }

  // Check if all required keys are present in the object
  for (const key of requiredKeys) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
};
