/* eslint-disable no-restricted-syntax,no-unused-vars,no-param-reassign */
/**
 * @flow
 */

import { ApisauceInstance, create } from 'apisauce';
import { AxiosRequestConfig } from 'axios';
import Config from '../../Config';
import HttpError from './HttpError';

export default class Backend {
  private readonly api: ApisauceInstance;

  constructor(defaultHeaders?: any, baseUrl?: string) {
    const headers = Object.assign({
      Accept: 'application/json',
    }, defaultHeaders);

    this.api = create({
      baseURL: baseUrl || Config.backend.url,
      headers,
      timeout: 10000,
    });
  }

  filterResponse(path: string): (res: any) => any {
    return (res: any) => {
      if (res.ok) {
        return res.data;
      } else if (res.problem === 'SERVER_ERROR') {

      }
      throw new HttpError(res, path);
    };
  }

  getOptions(options: any = {}, source?: any): AxiosRequestConfig {
    const properOptions = options || {};
    if (source && source.token) {
      properOptions.cancelToken = source.token;
    }
    return properOptions;
  }

  get(path: string, params?: any, options?: any): Promise<any> {
    const axiosOptions = this.getOptions(options);
    return this.api.get(path, params, axiosOptions).then(this.filterResponse(path));
  }

  head(path: string, params?: any, options?: any): Promise<any> {
    const axiosOptions = this.getOptions(options);
    return this.api.head(path, params, axiosOptions);
  }

  post(path: string, data?: any, options?: any): Promise<any> {
    const axiosOptions = this.getOptions(options);
    return this.api.post(path, data, axiosOptions).then(this.filterResponse(path));
  }

  put(path: string, data?: any, options?: any): Promise<any> {
    const axiosOptions = this.getOptions(options);
    return this.api.put(path, data, axiosOptions).then(this.filterResponse(path));
  }

  delete(path: string, data?: any, options?: any): Promise<any> {
    const axiosOptions = this.getOptions(options);
    return this.api.delete(path, data, axiosOptions).then(this.filterResponse(path));
  }

  postForm(path: string, data?: any, options?: any): Promise<any> {
    const formData = new FormData();
    const entries = Object.entries(data);
    for (const [key, value] of entries) {
      formData.append(key, value);
    }
    const properOptions = options || {};
    const headers = properOptions.headers || {};
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    properOptions.headers = headers;

    return this.post(path, formData, properOptions);
  }
}
