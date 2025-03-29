// Need to use the React-specific entry point to import createApi
import {createApi} from '@reduxjs/toolkit/query/react';
import {URLS} from '@kp/constants/api';
import {queryGenerator} from '@kp/utils/helper';
import {baseQueryWithReauth} from './index';

export const ngnApi = createApi({
  reducerPath: 'ngn',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getNGNBankList: builder.query<NGNBankList, void>({
      query: () => queryGenerator(URLS.getNGNBankList, 'GET'),
    }),
    getAccount: builder.mutation({
      query: (body: GetAccount) =>
        queryGenerator(URLS.getAccount, 'POST', body),
    }),
    ngnExternalTransfer: builder.mutation({
      query: (body: NgnExternalTransfer) =>
        queryGenerator(URLS.ngnExternalTransfer, 'POST', body),
    }),
    ngnInternalTransfer: builder.mutation({
      query: (body: NgnInternalTransfer) =>
        queryGenerator(URLS.ngnIxternalTransfer, 'POST', body),
    }),
    ngnGetChargePerAmount: builder.mutation({
      query: (body: NgnCharge) =>
        queryGenerator(URLS.getChargeFromAmount, 'POST', body),
    }),
    usBookTransferCharge: builder.mutation({
      query: (body: BookTransferCharge) =>
        queryGenerator(URLS.getBookTransferCharge, 'POST', body),
    }),
  }),
});

export const {
  useGetNGNBankListQuery,
  useGetAccountMutation,
  useNgnExternalTransferMutation,
  useNgnInternalTransferMutation,
  useNgnGetChargePerAmountMutation,
  useUsBookTransferChargeMutation,
} = ngnApi;
