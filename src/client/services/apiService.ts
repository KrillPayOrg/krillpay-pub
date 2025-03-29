import {BASE_URL, URLS} from '@kp/constants/api';
import {useLogoutUsersMutation, usersApi} from '@kp/redux/service/users';
import {
  logoutUser,
  resetUserWalletAndTransaction,
} from '@kp/redux/slices/userSlice';
import {store} from '@kp/redux/store';
import {generateHash} from '@kp/utils/auth';
import axios, {AxiosInstance} from 'axios';

import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(config => {
  const timeStamp = Date.now();
  const hash = generateHash(timeStamp);
  const accessToken = storage.getString('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers['x-timestamp'] = timeStamp;
    config.headers['x-hash'] = hash;
  } else {
    config.headers['x-timestamp'] = timeStamp;
    config.headers['x-hash'] = hash;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (error.response.status === 401) {
          console.log('restting State');
          store.dispatch(resetUserWalletAndTransaction());
          store.dispatch(logoutUser());
          store.dispatch(usersApi.util.resetApiState());
          storage.delete('accessToken');
          storage.delete('refreshToken');
        } else {
          // TODO:Handle 403 error - Refresh access token
          const newAccessToken = await refreshAccessToken(api, () => {
            //TODO: Handle Extra Funcionality On Getting Refresh Token
          });

          // Update the stored access token
          storage.set('accessToken', newAccessToken);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh error, e.g., redirect to login
        console.error('Error refreshing access token:', refreshError);
        // Redirect to login or show an error message
        store.dispatch(resetUserWalletAndTransaction());
        store.dispatch(logoutUser());
        store.dispatch(usersApi.util.resetApiState());
        storage.delete('accessToken');
        storage.delete('refreshToken');
        throw refreshError;
      }
    }

    return Promise.reject(error);
  },
);

// Function to refresh access token using the refresh token
export const refreshAccessToken = async (
  apiInstance: any,
  navigateCallback: any,
) => {
  const refreshToken = storage.getString('refreshToken');
  if (!refreshToken) {
    // Handle the scenario where there is no refresh token
    navigateCallback();
    throw new Error('Please Login Again, Session Expired');
  }

  try {
    const response = await apiInstance.post(URLS.refreshToken, {
      refreshToken,
    });
    // Extract and return the new access token from the response
    return response.data.accessToken;
  } catch (error) {
    // Handle the refresh request error
    console.error('Error refreshing access token:', error);
    console.log('restting State');
    store.dispatch(resetUserWalletAndTransaction());
    store.dispatch(logoutUser());
    store.dispatch(usersApi.util.resetApiState());
    storage.delete('accessToken');
    storage.delete('refreshToken');
    throw error;
  }
};

export default api;
