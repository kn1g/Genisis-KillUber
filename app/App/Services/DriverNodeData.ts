import { observable } from 'mobx';
import DistanceCalculator from '../Utils/DistanceCalculator';

export default class DriverNodeData {
  @observable
  EOSName: String;
  @observable
  IP: string;
  @observable
  longitude: number;
  @observable
  latitude: number;

  constructor(json: any) {
    this.EOSName = json.EOSName;
    this.IP = json.IP;
    this.longitude = json.longitude;
    this.latitude = json.latitude;
  }

  distance(lat: number, lon: number): number {
    return DistanceCalculator.distance(lat, lon, this.latitude, this.longitude);
  }
}
