/**
 * Created by neo on 2019-06-23
 */
import React, { RefObject } from 'react';
import { LayoutChangeEvent, StyleSheet, TextInput, View } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { autorun, computed, IReactionDisposer, observable, toJS, when } from 'mobx';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Config from '../../Config';
import MapViewDirections from 'react-native-maps-directions';
import RootStore from '../../Store/RootStore';
import MockRoute from './MockRouteData';
import Screen from '../Components/Screen';
import HalfBottomDriverAcceptSelection from './HalfBottomDriverAcceptSelection';
import DriverEntry from '../../Services/DriverEntry';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    padding: 8,
    paddingHorizontal: 16,
    fontFamily: 'Lato-Regular',
    borderRadius: 4,
    shadowColor: '#000',
    fontSize: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  bottomOverlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export interface AcceptScreenProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class AcceptScreen extends React.Component<AcceptScreenProps> {
  private mapView?: MapView;
  @observable
  routeData = MockRoute;
  @observable
  mountAccept: boolean = false;

  componentDidMount(): void {
    // little hack to resize the map properly
    setTimeout(() => {
      this.mountAccept = true;
    }, 100);
  }

  handleLayoutBottomOverlay = ({
    nativeEvent: {
      layout: { width, height },
    },
  }: LayoutChangeEvent) => {
    if (height > 0 && this.mapView && this.route) {
      this.mapView.fitToCoordinates(toJS(this.route), {
        edgePadding: {
          right: 32,
          bottom: height + 16,
          left: 32,
          top: 140,
        },
      });
    }
  };

  handleMapClick = () => {
    this.props.rootStore!.keyboard.dismiss();
  };

  setMapViewRef = (ref: MapView) => (this.mapView = ref);

  @computed
  get driver(): DriverEntry {
    return this.props.navigation.getParam('driver');
  }

  @computed
  get destination(): any {
    return this.destCoords;
  }

  @computed
  get route(): Array<any> | undefined {
    if (this.routeData) {
      return this.routeData.coordinates;
    }
    return undefined;
  }

  @computed
  get destinationEntry(): any {
    if (this.route && this.route.length > 0) {
      return this.route[this.route.length - 1];
    }
    return undefined;
  }

  /**
   * Little hack to get around the "frozen" object error
   */
  @computed
  get destCoords(): any {
    return this.destinationEntry
      ? { longitude: this.destinationEntry.longitude, latitude: this.destinationEntry.latitude }
      : undefined;
  }

  @computed
  get coords(): any {
    return {
      latitude: 47.3793117,
      longitude: 8.5438167,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  render() {
    const { coords } = this;
    return (
      <Screen>
        <MapView
          ref={this.setMapViewRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={coords}
          onPress={this.handleMapClick}
        >
          <MapView.Marker coordinate={this.coords} />
          {this.destCoords ? (
            <React.Fragment>
              <MapView.Marker coordinate={this.destCoords} />
            </React.Fragment>
          ) : null}
          {this.destination ? (
            <MapViewDirections
              origin={this.coords}
              destination={this.destination}
              apikey={Config.gmapsApiKey}
              strokeWidth={3}
              strokeColor="#EA0B8C"
            />
          ) : null}
        </MapView>
        { this.mountAccept ? (
          <View style={styles.bottomOverlayContainer} onLayout={this.handleLayoutBottomOverlay}>
            <HalfBottomDriverAcceptSelection routeData={this.routeData} driver={this.driver} />
          </View>
        ) : null}
      </Screen>
    );
  }
}
