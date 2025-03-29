// Need to use the React-specific entry point to import createApi
import {createApi} from '@reduxjs/toolkit/query/react';
import {URLS} from '@kp/constants/api';
import {queryGenerator} from '@kp/utils/helper';

import {baseQueryWithReauth} from './index';

export const transactionApi = createApi({
  reducerPath: 'transaction',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    exchangeMoney: builder.mutation({
      query: (body: ExchangeMoney) =>
        queryGenerator(URLS.exchangeMoney, 'POST', body),
    }),
    usInternalbookTransfer: builder.mutation({
      query: (body: USBookTransfer) =>
        queryGenerator(URLS.bookTransfer, 'POST', body),
    }),
    getWalletBalance: builder.query<any, any>({
      query: (arg: any) => {
        return {
          url: `${URLS.getWalletBalance}/${arg}`,
          method: 'GET',
        };
      },
    }),
    getWalletTransaction: builder.query<any, any>({
      query: (arg: any) => {
        let {id, ...newObj} = arg;
        return {
          url: `${URLS.getWalletsTransaction}/${id}`,
          method: 'GET',
          params: {...newObj},
        };
      },
    }),
    getWalletTransfer: builder.query<any, any>({
      query: (arg: any) => {
        let {id, ...newObj} = arg;
        return {
          url: `${URLS.getWalletsTransfer}/${id}`,
          method: 'GET',
          params: {...newObj},
        };
      },
    }),
  }),
});

export const {
  useExchangeMoneyMutation,
  useUsInternalbookTransferMutation,
  useGetWalletBalanceQuery,
  useLazyGetWalletBalanceQuery,
  useLazyGetWalletTransactionQuery,
  useGetWalletTransactionQuery,
  useGetWalletTransferQuery,
} = transactionApi;
