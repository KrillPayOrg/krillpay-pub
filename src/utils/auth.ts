import QuickCrypto from 'react-native-quick-crypto';
import {HASH_SECRET, HASH_TITLE} from '@env';

export const generateHash = (timestamp: number): string => {
  const data = `${HASH_TITLE}${timestamp}`;
  return QuickCrypto.createHmac('sha256', HASH_SECRET)
    .update(data)
    .digest('hex');
};
