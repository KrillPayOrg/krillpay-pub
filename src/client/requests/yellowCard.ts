import {URLS} from '@kp/constants/api';
import {get, post} from '../services/api';

interface TransactionProps {
  channel: Network | undefined;
  network: Bank | undefined;
  reason: string;
  accountNumber: string;
  amount: string;
  rate: Rate;
  accountName: string;
}

export const handleRateSelect = async (currency: string) => {
  try {
    const response = await get(`${URLS.getExchangeRates}?currency=${currency}`);
    console.log(response.data, 'helloo==>');
    return response.data.rates;
  } catch (error) {
    console.log(error, 're');
  }
};

export const getAvailableChannels = async (country: string) => {
  try {
    const response = await get(`${URLS.getYellowChannels}?country=${country}`);
    return response.data.activeChannels;
  } catch (error) {
    console.log(error, 'err');
  }
};

export const getAvailableNetworks = async (
  country: string,
  networkId: string | undefined,
) => {
  try {
    const response = await get(
      `${URLS.getYellowNetworks}?country=${country}&channelId=${networkId}`,
    );
    return response.data.networks;
  } catch (error) {
    console.log(error, 'err');
  }
};

export const initiateYellowTranscation = async (data: TransactionProps) => {
  try {
    const response = await post(URLS.initiateYellowTranscation, data);
    return response.data;
  } catch (error) {
    console.log(error, 'err');
  }
};
