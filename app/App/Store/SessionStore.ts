import { observable, ObservableMap} from 'mobx';
import AppStorage from '../Services/AppStorage';

const SETTINGS_KEY = '@Session';
const VERSION_KEY = 'session_storage_version';

/**
 * Use if needed for a session like user logs in and logs out.
 * There are very rare cases but the HttpQueue is one.
 */
export class SessionStoreClass {
  @observable
  settings: ObservableMap<string, any> = observable.map({});
  @observable
  storageVersion?: string;
  appStorage: AppStorage = new AppStorage('@session');
  loadPromise?: Promise<any>;

  constructor() {
    this.loadPromise = this.migrate1_0();
  }

  async load() {
    await this.migrate1_0();
    this.settings = observable.map(this.appStorage.load());
  }

  async loadStorageVersion(): Promise<string> {
    if (this.storageVersion) {
      return this.storageVersion;
    }
    const version = await AppStorage.default.get(VERSION_KEY);
    this.storageVersion = version || '1.0';
    return this.storageVersion || '1.0';
  }

  set(key: string, value: any): Promise<any> {
    this.settings.set(key, value);
    return this.appStorage.set(key, value);
  }

  async get(key: string, defaultValue?: any): Promise<any> {
    const value = this.settings.get(key) || await this.appStorage.get(key);
    this.settings.set(key, value);
    return value || defaultValue;
  }

  delete(key: string): Promise<any> {
    this.settings.delete(key);
    return this.appStorage.delete(key);
  }
  
  async migrate1_0() {
    try {
      const version = await this.loadStorageVersion();
      console.log(`Session store is version ${version}`);
      if (version === '1.0') {
        await this.load1_0();
        await this.appStorage.multiSet(this.settings);
      }
      return AppStorage.default.set(VERSION_KEY, '2.0');
    } catch (e) {
    }
  }

  async load1_0() {
    try {
      const settings = await AppStorage.default.get(SETTINGS_KEY);
      this.settings = observable.map(settings || {});
    } catch (err) {
    }
  }

  async clear() {
    this.settings = observable.map({});
    return this.appStorage.clear();
  }
}

const SessionStore = new SessionStoreClass();
export default SessionStore;
