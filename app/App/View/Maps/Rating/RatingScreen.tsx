/**
 * Created by neo on 2019-06-23
 */
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { computed, observable } from 'mobx';
import Screen from '../../Components/Screen';
import { AirbnbRating, Rating } from 'react-native-ratings';
import RootStore from '../../../Store/RootStore';
import DriverEntry from '../../../Services/DriverEntry';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    alignItems: 'center',
  },
  image: {
    width: 128,
    height: 128,
    marginTop: 72,
    borderRadius: 64,
    marginBottom: 8,
  },
  price: {
    fontFamily: 'Lato-Light',
    color: 'grey',
    fontSize: 36,
    marginTop: 16,
    textAlign: 'center',
  },
  driverName: {
    marginTop: 16,
    marginBottom: 32,
    fontSize: 24,
    fontFamily: 'Lato-Thin',
    // fontStyle: 'italic',
  },
  desc: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 14,
    fontFamily: 'Lato-Thin',
    // fontStyle: 'italic',
  },
  submitButton: {
    padding: 16,
    backgroundColor: 'grey',
  },
  submitText: {
    fontSize: 18,
    fontFamily: 'Lato-Light',
    textAlign: 'center',
    color: 'white',
  }
});

export interface RatingScreenProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class RatingScreen extends React.Component<RatingScreenProps> {

  handleSubmitPress = () => {
    this.props.rootStore!.navigation.reset('App');
  };

  @computed
  get routeData(): any {
    return this.props.navigation.getParam('routeData');
  }

  @computed
  get driver(): DriverEntry {
    return this.props.navigation.getParam('driver');
  }

  @computed
  get price(): number {
    return Math.round(this.driver.BasePrice * this.routeData.distance * 100) / 100;
  }

  @computed
  get priceString(): string {
    return `CHF ${this.price}`;
  }

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <Text style={styles.price}>{this.priceString}</Text>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: this.driver.avatarurl }}
          />
          <Text style={styles.driverName}>{this.driver.Name}</Text>
          <AirbnbRating
            showRating={false}
            ratingCount={5}
            ratingColor="#EA0B8C"
            ratingBackgroundColor="#EA0B8C"
            ratingTextColor="#EA0B8C"
            startingValue={4}
            imageSize={38}
          />
          <Text style={styles.desc}>{`How would you rate your ride with ${this.driver.Name}?`}</Text>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmitPress}>
          <Text style={styles.submitText}>Pay & Rate</Text>
        </TouchableOpacity>
      </Screen>
    );
  }
}