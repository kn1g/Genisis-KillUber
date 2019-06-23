/**
 * Created by neo on 2019-06-22
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import RootStore from '../../Store/RootStore';
import { computed, observable } from 'mobx';
import moment from 'moment';
import AcceptDeclineButton from './AcceptDeclineButton';
import { ifIphoneX, isIphoneX } from '../../Utils/IphoneXUtil';
import DriverEntry from '../../Services/DriverEntry';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    ...ifIphoneX({
      paddingBottom: 32,
    })
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 8,
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    padding: 16,
  },
  routeText: {
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
  subRouteText: {
    fontFamily: 'Lato-Thin',
    marginBottom: 16,
    fontSize: 14,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Lato-Thin',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    fontFamily: 'Lato-Regular',
  },
  routeHeader: {
    padding: 16,
    alignItems: 'center',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: 'gray',
    // borderTopColor: 'gray',
  },
  distanceText: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  durationText: {
    fontFamily: 'Lato-Thin',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 32,
    paddingTop: 16,
  }
});

export interface HalfBottomDriverAcceptSelectionProps {
  rootStore?: RootStore;
  driver: DriverEntry;
  routeData: any;
}

@inject('rootStore')
@observer
export default class HalfBottomDriverAcceptSelection extends React.Component<HalfBottomDriverAcceptSelectionProps> {

  @computed
  get route(): Array<any> {
    return this.props.routeData.coordinates;
  }

  @computed
  get startingPoint(): any {
    return this.route[0];
  }

  @computed
  get duration(): string {
    const ms = this.props.routeData.duration * 60 * 1000;
    return moment.utc(ms).format('HH:mm');
  }

  @computed
  get distance(): string {
    const { props: { routeData: { distance } } } = this;
    return `${Math.round(distance * 100) / 100}km`;
  }

  @computed
  get price(): number {
    return Math.round(this.props.driver.BasePrice * this.props.routeData.distance * 100) / 100;
  }

  @computed
  get priceString(): string {
    return `CHF ${this.price}`;
  }

  handlePressAccept = () => {
    this.props.rootStore!.navigation.reset('Rating', { routeData: this.props.routeData, driver: this.props.driver });
  };

  handlePressReject = () => {
    this.props.rootStore!.navigation.reset('App');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.routeHeader}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: 'https://www.oyoba.net/wp-content/uploads/2018/02/kevin_schellinger-394x263.jpg' }}
          />
          <Text style={styles.routeText}>{'Kevin Schellinger'}</Text>
          <Text style={[styles.routeText, styles.subRouteText]}>{'wants to drive with you'}</Text>
          <Text style={styles.distanceText}>{this.distance}</Text>
          <Text style={styles.durationText}>{this.duration}</Text>
          <Text style={[styles.distanceText, { marginTop: 8, fontSize: 24 }]}>{this.priceString}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <AcceptDeclineButton onPress={this.handlePressAccept} positive text="Accept" />
          <AcceptDeclineButton onPress={this.handlePressReject} style={{ marginTop: 8 }} text="Decline" />
        </View>
      </View>
    );
  }
}