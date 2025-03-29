// Need to use the React-specific entry point to import createApi
import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQueryWithReauth} from './index';
import {URLS} from '@kp/constants/api';

export const us = createApi({
  reducerPath: 'us',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getExternalBanks: builder.query<any, void>({
      query: (arg: any) => {
        return {
          url: URLS.externalBankList,
          method: 'GET',
          params: {...arg},
        };
      },
    }),
  }),
});

export const {useGetExternalBanksQuery} = us;
