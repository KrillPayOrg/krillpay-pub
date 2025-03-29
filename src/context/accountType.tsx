import {AccountType} from '@kp/constants/enum';
import {useAppDispatch} from '@kp/redux/slices';
import {resetUserWalletAndTransaction} from '@kp/redux/slices/userSlice';
import React, {createContext, useState, useContext, useMemo} from 'react';
interface AccountContext {
  accountType: AccountType;
  setAccountType: (ac: AccountType) => void;
}
const AccountContext = createContext<AccountContext>({
  accountType: AccountType.INDIVIDUAL,
  setAccountType: (value: AccountType) => {},
});

export const useAccountContext = () => useContext(AccountContext);

export const AccountTypeProvider = ({children}: any) => {
  const dispatch = useAppDispatch();
  const [accountType, toggleAccountType] = useState<AccountType>(
    AccountType.INDIVIDUAL,
  );

  const setAccountType = (value: AccountType) => {
    dispatch(resetUserWalletAndTransaction());
    toggleAccountType(value);
  };

  const contextValue = useMemo(
    () => ({
      accountType,
      setAccountType,
    }),
    [accountType, setAccountType],
  );

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};
