import { observable, runInAction } from 'mobx';
import { GeolocationReturnType, Platform } from 'react-native';

export default class LocationStore {
  @observable
  location?: GeolocationReturnType;
  watchId?: number;
  locationOptions: any =
    Platform.OS === 'ios'
      ? {
          timeout: 30000,
          maximumAge: 5000,
          enableHighAccuracy: true,
        }
      : undefined;

  start() {
    this.stop();
    this.watchId = navigator.geolocation.watchPosition(
      (data: GeolocationReturnType) => {
        this.handlePositionSuccess(data);
      },
      (err: any) => {
        this.handlePositionError(err);
      },
      this.locationOptions,
    );
  }

  stop() {
    this.watchId && navigator.geolocation.stopObserving();
  }

  private handlePositionSuccess(data: GeolocationReturnType) {
    console.log('Resolved location', data.coords);
    runInAction(() => {
      this.location = data;
    });
  }

  private handlePositionError(err: any /* PositionError */) {
    console.log('position error', err);
  }
}
