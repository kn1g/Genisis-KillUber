import {Keyboard, KeyboardEvent} from 'react-native';
import { observable, computed } from 'mobx';

export default class KeyboardStore {
  @observable
  private visible: boolean = false;

  constructor() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  keyboardDidShow = (event: KeyboardEvent) => {
    this.visible = true;
  };

  keyboardDidHide = (event: KeyboardEvent) => {
    this.visible = false;
  };

  @computed
  get isVisible(): boolean {
    return this.visible;
  }

  dismiss() {
    Keyboard.dismiss();
  }
}
