import { computed, observable } from 'mobx';
import DriverNodeData from './DriverNodeData';

export default class DriverEntry extends DriverNodeData {
  @observable
  Name: string;
  @observable
  Car: string;
  @observable
  License: string;
  @observable
  avatarurl: string;
  @observable
  currency: string = '';
  @observable
  BasePrice: number;
  @observable
  RepuID: number;

  constructor(json: any) {
    super(json);
    this.Name = json.Name;
    this.Car = json.Car;
    this.License = json.License;
    this.avatarurl = json.avatarurl;
    this.currency = json.currency;
    this.BasePrice = json.BasePrice;
    this.RepuID = json.RepuID;
  }
}