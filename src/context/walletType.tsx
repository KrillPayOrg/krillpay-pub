import {CARD_TYPE} from '@kp/constants/appText';
import {WalletType} from '@kp/constants/enum';
import {useAppSelector} from '@kp/redux/slices';
import React, {createContext, useState, useContext, useMemo} from 'react';
interface Wallet {
  wallet: WalletType;
  setWallet: (ac: WalletType) => void;
}
const WalletContext = createContext<Wallet>({
  wallet: CARD_TYPE.NGN,
  setWallet: () => {},
});

export const useWalletContext = () => useContext(WalletContext);

export const WalletTypeProvider = ({children}: any) => {
  const [wallet, setWallet] = useState<WalletType>(CARD_TYPE.USD);
  // const [wallet, setWallet] = useState<WalletType>(
  //   info.mobileCountry == 'US' ? CARD_TYPE.USD : CARD_TYPE.NGN,
  // );
  const contextValue = useMemo(
    () => ({
      wallet,
      setWallet,
    }),
    [wallet, setWallet],
  );

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
