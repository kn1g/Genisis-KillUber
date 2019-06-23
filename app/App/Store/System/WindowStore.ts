import { observable } from 'mobx';
import {Dimensions, ScaledSize} from 'react-native';

export default class WindowStore {
  @observable width: number = 0;
  @observable height: number = 0;

  constructor() {
    const { width, height } = Dimensions.get('window');
    console.log(`Loaded dimensions width = ${width}, height = ${height}`);
    this.width = width;
    this.height = height;

    Dimensions.addEventListener('change', this.handleChangeDimensions);
  }

  handleChangeDimensions = (data: { window: ScaledSize; screen: ScaledSize }) => {
    this.width = data.window.width;
    this.height = data.window.height;
  };
}
