import NavigationStore from './System/NavigationStore';
import WindowStore from './System/WindowStore';
import KeyboardStore from './System/KeyboardStore';
import LocationStore from './LocationStore';

export default class RootStore {
  debug: boolean = false;

  window: WindowStore;
  navigation: NavigationStore;
  keyboard: KeyboardStore;
  location: LocationStore;

  constructor(debug?: boolean) {
    this.debug = !!debug;

    this.window = new WindowStore();
    this.navigation = new NavigationStore();
    this.keyboard = new KeyboardStore();
    this.location = new LocationStore();
  }
}