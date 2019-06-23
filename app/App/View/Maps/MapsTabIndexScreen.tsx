import React, { RefObject } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, TextInput, View } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Screen from '../Components/Screen';
import RootStore from '../../Store/RootStore';
import { autorun, computed, IReactionDisposer, observable, toJS, when } from 'mobx';
import EosService from '../../Services/EosService';
import Config from '../../Config';
import { NetworkInfo } from 'react-native-network-info';
import HalfBottomDriverSelectionModal from './HalfBottomDriverSelectionModal';

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
  }
});

export interface MapsTabIndexScreenProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class MapsTabIndexScreen extends React.Component<MapsTabIndexScreenProps> {
  private dispose?: IReactionDisposer;
  private mapView?: MapView;
  private textInput: RefObject<TextInput> = React.createRef();
  @observable
  destination: string = '';
  @observable
  routeData?: any;
  destValue?: string = '';

  componentDidMount(): void {
    this.props.rootStore!.location.start();
    this.dispose = autorun(() => {
      console.log(this.props.rootStore!.location.location);
    });
    this.fetchIp();
  }

  componentWillUnmount(): void {
    this.dispose && this.dispose();
    this.props.rootStore!.location.stop();
  }

  fetchIp = async () => {
    const ipv4Address = await NetworkInfo.getIPV4Address();
    console.log('ipv4Address', ipv4Address);
  };

  handleChangeText = (value: string) => {
    this.destValue = value;
  };

  handleSubmit = () => {
    if (this.destValue) {
      this.destination = this.destValue;
    }
  };

  handleRouteReady = (data: any) => {
    console.log('routeData', JSON.stringify(data));
    if (data && data.coordinates) {
      this.routeData = data;
    }
  };

  handleInputFocus = () => {
    this.textInput && this.textInput.current && this.textInput.current.clear();
    this.routeData = undefined;
    this.destination = '';
    this.destValue = '';
  };

  handleLayoutBottomOverlay = ({ nativeEvent: { layout: { width, height } } }: LayoutChangeEvent) => {
    if (height > 0 && this.mapView && this.route) {
      this.mapView.fitToCoordinates(toJS(this.route), {
        edgePadding: {
          right: 16,
          bottom: height + 16,
          left: 16,
          top: 140,
        },
      });
    }
  };

  handleMapClick = () => {
    console.log('handleMapClick');
    // this.textInput && this.textInput.current && this.textInput.current.blur();
    this.props.rootStore!.keyboard.dismiss();
  };

  setMapViewRef = (ref: MapView) => (this.mapView = ref);

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
    if (this.props.rootStore!.location.location) {
      const {
        location: {
          location: {
            coords: { longitude, latitude },
          },
        },
      } = this.props.rootStore!;
      return {
        longitude,
        latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }
    // fallback to Bahnhofstrasse 3... for now
    return {
      latitude: 47.367469,
      longitude: 8.5392337,
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
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
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
              onReady={this.handleRouteReady}
            />
          ) : null}
        </MapView>
        <View style={styles.inputContainer}>
          <TextInput
            ref={this.textInput}
            style={styles.input}
            placeholder={'Destination...'}
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmit}
            onFocus={this.handleInputFocus}
          />
        </View>
        {this.route ? (
          <View style={styles.bottomOverlayContainer} onLayout={this.handleLayoutBottomOverlay}>
            <HalfBottomDriverSelectionModal routeData={this.routeData} />
          </View>
        ) : null}
      </Screen>
    );
  }
}
