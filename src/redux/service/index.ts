import {BASE_URL, URLS} from '@kp/constants/api';
import {RootState} from '@kp/redux/slices';
import {
  BaseQueryFn,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  logoutUser,
  resetUserWalletAndTransaction,
  setToken,
} from '../slices/userSlice';
import {usersApi} from './users';
import {storage} from '@kp/utils/common';
import {generateHash} from '@kp/utils/auth';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, {getState, extraOptions}) => {
    const state = getState() as RootState;
    const token = state.user.token || storage.getString('accessToken');
    const timeStamp = Date.now();
    const hash = generateHash(timeStamp);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      headers.set('x-timestamp', `${timeStamp}`);
      headers.set('x-hash', hash);
    } else {
      headers.set('x-timestamp', `${timeStamp}`);
      headers.set('x-hash', hash);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  any,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const {dispatch, getState} = api;

  if (result.error && result.error.status === 403) {
    const state = getState() as RootState;
    const refreshToken =
      state.user.refreshToken || storage.getString('refreshToken');

    if (refreshToken) {
      try {
        // Request a new access token using the refresh token
        const refreshResponse: any = await baseQuery(
          {
            url: URLS.refreshToken, // Replace with your refresh token endpoint
            method: 'POST',
            body: {refreshToken},
          },
          api,
          extraOptions,
        );

        if (refreshResponse.data) {
          const newAccessToken = refreshResponse.data.accessToken;
          dispatch(setToken(newAccessToken));
          // Update the access token in storage and state
          storage.set('accessToken', newAccessToken);

          // Retry the original request with the new access token
          const updatedArgs = {
            ...args,
            headers: {
              ...args.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          };

          return baseQuery(updatedArgs, api, extraOptions);
        } else {
          // Handle failure to refresh token
          throw new Error('Failed to refresh access token');
        }
      } catch (refreshError) {
        // Clear tokens and log out the user on refresh failure
        storage.delete('accessToken');
        storage.delete('refreshToken');
        dispatch(resetUserWalletAndTransaction());
        dispatch(logoutUser());
        dispatch(usersApi.util.resetApiState());
        return {error: {status: 403, data: 'Unauthorized'}};
      }
    } else {
      // No refresh token available, log out the user
      storage.delete('accessToken');
      storage.delete('refreshToken');
      dispatch(resetUserWalletAndTransaction());
      dispatch(logoutUser());
      dispatch(usersApi.util.resetApiState());
    }
  } else if (result.error && result.error.status === 401) {
    storage.delete('accessToken');
    storage.delete('refreshToken');
    dispatch(resetUserWalletAndTransaction());
    dispatch(logoutUser());
    dispatch(usersApi.util.resetApiState());
  }

  return result;
};
