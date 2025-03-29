// Need to use the React-specific entry point to import createApi
import {createApi} from '@reduxjs/toolkit/query/react';
import {URLS} from '@kp/constants/api';
import {queryGenerator} from '@kp/utils/helper';
import {baseQueryWithReauth} from './index';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: (body: LoginPayload) => queryGenerator(URLS.login, 'POST', body),
    }),
    logoutUsers: builder.mutation({
      query: () => queryGenerator(URLS.logout, 'POST'),
    }),
    getUserInfo: builder.query({
      query: () => queryGenerator(URLS.getUserInfo, 'POST'),
    }),
    getUserTransactionControl: builder.query({
      query: () => queryGenerator(URLS.getUserTransactionControl, 'GET'),
    }),
    getUserWallet: builder.query({
      query: () => queryGenerator(URLS.getWallets, 'GET'),
    }),
    getKycStatus: builder.query({
      query: () => queryGenerator(URLS.getKycStatus, 'POST', {}),
    }),
    getUserList: builder.query<any, void>({
      query: (arg: any) => {
        console.log(arg, 'atgu');
        return {
          url: URLS.getUserList,
          method: 'GET',
          params: {...arg},
        };
      },
    }),
    uploadAvatar: builder.mutation({
      query: (body: UploadAvatarPayload | undefined) =>
        queryGenerator(URLS.uploadProfileImage, 'POST', body),
    }),
    verifyPin: builder.mutation({
      query: (body: VerifyPin) => queryGenerator(URLS.verifyPin, 'POST', body),
    }),
    checkFeildAvailable: builder.mutation({
      query: (body: FeildAvailable) =>
        queryGenerator(URLS.feildAvailable, 'POST', body),
    }),
    getCountriesList: builder.query<any, void>({
      query: () => queryGenerator(URLS.getCountriesList, 'GET'),
    }),
    getStatesFromCountry: builder.mutation({
      query: (body: States) =>
        queryGenerator(URLS.getStatesFromCountry, 'POST', body),
    }),
    getCitiesFromState: builder.mutation({
      query: (body: Cities) =>
        queryGenerator(URLS.getCitiesFromState, 'POST', body),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUsersMutation,
  useGetUserInfoQuery,
  useLazyGetUserInfoQuery,
  useLazyGetUserTransactionControlQuery,
  useGetUserWalletQuery,
  useGetKycStatusQuery,
  useLazyGetKycStatusQuery,
  useGetUserListQuery,
  useUploadAvatarMutation,
  useVerifyPinMutation,
  useCheckFeildAvailableMutation,
  useGetCountriesListQuery,
  useGetStatesFromCountryMutation,
  useGetCitiesFromStateMutation,
} = usersApi;
