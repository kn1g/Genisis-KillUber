import {IReactionDisposer} from 'mobx';

export default class DisposableStore {

  protected disposers: Array<IReactionDisposer> = [];

  public dispose() {
    for (const dispose of this.disposers) {
      dispose();
    }
  }
}