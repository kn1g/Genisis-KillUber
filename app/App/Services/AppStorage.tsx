import AsyncStorage from '@react-native-community/async-storage';
import { toJS } from 'mobx';

export default class AppStorage {
  static default = new AppStorage();

  private readonly namespace?: string;

  constructor(namespace?: string) {
    this.namespace = namespace;
  }

  async getAllKeys(): Promise<Array<string>> {
    const keys = await AsyncStorage.getAllKeys();
    return keys.filter((key: string) => !this.namespace || key.startsWith(this.namespace));
  }

  multiSet(data: Map<string, any>): Promise<any> {
    const jsonData = Array.from(data.entries()).map(([key, entry]) =>
      this.namespace ? [`${this.namespace}_${key}`, this.normalize(entry)] : [key, this.normalize(entry)],
    );
    const eraseKeys = jsonData.filter(([, entry]) => !entry).map(([key]) => key) as Array<string>;
    const saveData = jsonData.filter(([, entry]) => !!entry) as Array<Array<string>>;

    if (eraseKeys.length > 0 && saveData.length > 0) {
      return Promise.all([AsyncStorage.multiSet(saveData), AsyncStorage.multiRemove(eraseKeys)]);
    } else if (eraseKeys.length > 0) {
      return AsyncStorage.multiRemove(eraseKeys);
    } else if (saveData.length > 0) {
      return AsyncStorage.multiSet(saveData);
    }
    return Promise.resolve();
  }

  store(key: string, data: any): Promise<void> {
    try {
      const json = this.normalize(data);
      const saveKey = this.namespace ? `${this.namespace}_${key}` : key;
      if (json) {
        return AsyncStorage.setItem(saveKey, json);
      }
      return AsyncStorage.removeItem(saveKey);
    } catch (e) {
    }
    return Promise.resolve();
  }

  set(key: string, data: any): Promise<any> {
    return this.store(key, data);
  }

  async push(key: string, data: any): Promise<any> {
    try {
      const entry = this.clean(data);
      if (entry) {
        const array = await this.get(key);
        if (Array.isArray(array)) {
          array.push(entry);
          return this.store(key, array);
        }
        return this.store(key, [entry]);
      }
    } catch (e) {}
  }

  async get(key: string): Promise<any | undefined> {
    try {
      const json = await AsyncStorage.getItem(this.namespace ? `${this.namespace}_${key}` : key);
      if (json) {
        return JSON.parse(json);
      }
    } catch (e) {
    }
    return undefined;
  }

  delete(key: string): Promise<void> {
    return AsyncStorage.removeItem(this.namespace ? `${this.namespace}_${key}` : key);
  }

  multiRemove(keys: Array<string>): Promise<void> {
    if (keys.length > 0) {
      return AsyncStorage.multiRemove(keys.map((key: string) => (this.namespace ? `${this.namespace}_${key}` : key)));
    }
    return Promise.resolve();
  }

  async load(): Promise<any> {
    const keys = await this.getAllKeys();
    const results = await AsyncStorage.multiGet(keys);
    return results.reduce((result: any, [key, value]) => {
      const cleanKey = this.namespace ? key.replace(`${this.namespace}_`, '') : key;
      try {
        if (value) {
          result[cleanKey] = JSON.parse(value);
        } else {
          result[cleanKey] = undefined;
        }
      } catch (e) {
        console.log(`Unable to parse ${cleanKey}`);
        result[cleanKey] = undefined;
      }
      return result;
    }, {});
  }

  async clear(): Promise<any> {
    const deleteKeys = await this.getAllKeys();
    if (deleteKeys.length > 0) {
      return AsyncStorage.multiRemove(deleteKeys);
    }
    return Promise.resolve();
  }

  private clean(data: any): any | undefined {
    if (data) {
      return data.toJS instanceof Function ? data.toJS() : toJS(data);
    }
    return undefined;
  }

  private normalize(data: any): string | undefined {
    if (data) {
      const clear = this.clean(data);
      return JSON.stringify(clear);
    }
    return undefined;
  }
}
