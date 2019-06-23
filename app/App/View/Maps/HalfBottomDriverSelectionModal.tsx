/**
 * Created by neo on 2019-06-22
 */
import React from 'react';
import { StyleSheet, SafeAreaView, View, TouchableOpacity, ScrollView, ActivityIndicator, Text } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import RootStore from '../../Store/RootStore';
import DriverSelectionListItem from './DriverSelectionListItem';
import { computed, observable } from 'mobx';
import { fromPromise, IPromiseBasedObservable, PENDING, REJECTED } from 'mobx-utils';
import EosService from '../../Services/EosService';
import DriverEntry from '../../Services/DriverEntry';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    padding: 16,
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
    margin: 16
  },
  routeHeader: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
    borderTopColor: 'gray',
  },
  distanceText: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  durationText: {
    fontFamily: 'Lato-Thin',
    textAlign: 'center',
  }
});

export interface HalfBottomDriverSelectionModalProps {
  rootStore?: RootStore;
  routeData: any;
}

@inject('rootStore')
@observer
export default class HalfBottomDriverSelectionModal extends React.Component<HalfBottomDriverSelectionModalProps> {

  @observable data?: IPromiseBasedObservable<Array<DriverEntry>>;
  private readonly eosService = new EosService();

  componentDidMount(): void {
    this.data = fromPromise(this.eosService.listDrivers());
  }

  @computed
  get route(): Array<any> {
    return this.props.routeData.coordinates;
  }

  @computed
  get loading(): boolean {
    return !this.data || this.data.state === PENDING;
  }

  @computed
  get error(): boolean {
    return !!this.data && this.data.state === REJECTED;
  }

  @computed
  get done(): boolean {
    return !this.loading && !this.error;
  }

  @computed
  get drivers(): Array<any> {
    if (this.done) {
      return this.data!.value;
    }
    return [];
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

  render() {
    return (
      <View style={styles.container}>
        { this.loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="black" size="large" />
            <Text style={styles.loadingText}>Searching for drivers...</Text>
          </View>
        ) : (
          <React.Fragment>
            {this.error ? (
              <Text style={styles.errorText}>An error occurred</Text>
            ) : (
                <ScrollView style={styles.contentContainer}>
                  <View style={styles.routeHeader}>
                    <Text style={styles.distanceText}>{this.distance}</Text>
                    <Text style={styles.durationText}>{this.duration}</Text>
                  </View>
                  {this.drivers.map((d: any) => (
                    <DriverSelectionListItem key={d.EOSName} distance={this.props.routeData.distance} driver={d} startingPoint={this.startingPoint}/>
                  ))}
                </ScrollView>
            )}
          </React.Fragment>
        )}
      </View>
    );
  }
}