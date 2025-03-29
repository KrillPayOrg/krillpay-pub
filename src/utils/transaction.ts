import {CARD_TYPE, TRANSACTION_SIDE_TEXT} from '@kp/constants/appText';

export const shouldShowRed = (type: string) => {
  return type == 'Dr' ? true : false;
};

export const shouldShowRedTransfer = (type: string, wallet: string) => {
  return (type == 'BUY' && wallet == CARD_TYPE.USDC) ||
    (type == 'SELL' && wallet == CARD_TYPE.USD)
    ? false
    : true;
};

export const getTransactionText = (
  type: string,
  wallet: string,
  text: string,
) => {
  return wallet === CARD_TYPE.USD ? TRANSACTION_SIDE_TEXT[type] : text;
};
