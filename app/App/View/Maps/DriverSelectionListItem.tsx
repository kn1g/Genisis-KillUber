/**
 * Created by neo on 2019-06-22
 */
import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { computed, observable } from 'mobx';
import DriverEntry from '../../Services/DriverEntry';
import RootStore from '../../Store/RootStore';
import { AirbnbRating, Rating } from 'react-native-ratings';

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    flexDirection: 'row',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingTop: 8,
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: 'Lato-Regular',
  },
  name: {
    fontFamily: 'Lato-Regular',
  },
  distance: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: 'gray',
  }
});

export interface DriverSelectionListItemProps {
  driver: DriverEntry;
  distance: number;
  startingPoint: any;
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class DriverSelectionListItem extends React.Component<DriverSelectionListItemProps> {

  @computed
  get price(): number {
    return Math.round(this.props.distance * this.props.driver.BasePrice * 100) / 100;
  }

  @computed
  get priceString(): string {
    return `${this.price} CHF`;
  }

  handlePress = () => {
    this.props.rootStore!.navigation.reset('Accept', { driver: this.props.driver });
  };

  render() {
    const { props: { driver, startingPoint: { latitude, longitude }} } = this;
    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: driver.avatarurl || 'https://www.oyoba.net/wp-content/uploads/2018/02/kevin_schellinger-394x263.jpg' }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{driver.Name}</Text>
          <Text style={styles.distance}>{`${driver.distance(latitude, longitude)}km`}</Text>
          <View>
            <Rating
              ratingCount={5}
              readonly
              startingValue={driver.RepuID}
              imageSize={12}
            />
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{this.priceString}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
