/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';

import api from './apiService';
import {handleError} from '@kp/utils/helper';

export const get = async (endpoint: string): Promise<AxiosResponse<any>> => {
  try {
    const response = await api.get<any>(endpoint);
    return response;
  } catch (error: any) {
    console.log(error, 'Error Object');

    // Handle plain Error object cases
    throw handleError(error);
  }
};

export const post = async (
  endpoint: string,
  data: any,
  config?: any,
): Promise<any> => {
  try {
    const response = await api.post<any>(endpoint, data, config);
    return response;
  } catch (error: any) {
    // Handle plain Error object cases
    throw handleError(error);
  }
};

export const deleteAPI = async (
  endpoint: string,
): Promise<AxiosResponse<any>> => {
  try {
    const response = await api.delete<any>(endpoint);
    return response;
  } catch (error: any) {
    // Handle plain Error object cases
    throw handleError(error);
  }
};

export const patch = async (
  endpoint: string,
  data: any,
  config?: any,
): Promise<AxiosResponse<any>> => {
  try {
    const response = await api.patch<any>(endpoint, data, config);
    return response;
  } catch (error: any) {
    // Handle plain Error object cases
    throw handleError(error);
  }
};
