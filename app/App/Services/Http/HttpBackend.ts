/**
 * @flow
 * Created by neo on 13.06.17.
 */

import BackendFactory from './BackendFactory';

export default class HttpBackend {
  static async post(url: string, data?: any, options?: any) {
    const backend = await BackendFactory();
    return backend.post(url, data, options);
  }

  static async get(url: string, params?: any, options?: any) {
    const backend = await BackendFactory();
    return backend.get(url, params, options);
  }

  static async head(url: string, params?: any, options?: any) {
    const backend = await BackendFactory();
    return backend.head(url, params, options);
  }

  static async put(url: string, data?: any, options?: any) {
    const backend = await BackendFactory();
    return backend.put(url, data, options);
  }

  static async delete(url: string, params?: any, options?: any) {
    const backend = await BackendFactory();
    return backend.delete(url, params, options);
  }
}
