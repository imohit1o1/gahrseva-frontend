import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './endpoints';

/**
 * Custom AxiosInstance type that accounts for the response interceptor unboxing.
 * Standard axios methods return Promise<AxiosResponse<T>>.
 * Our instance returns Promise<T> directly due to the interceptor in src/api/interceptor.ts.
 */
export interface CustomAxiosInstance extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'request'> {
  get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  request<T = any, R = T, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
}) as unknown as CustomAxiosInstance;

