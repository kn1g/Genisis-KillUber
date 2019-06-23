import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Screen from '../Components/Screen';

const styles = StyleSheet.create({});

export interface ProfileTabIndexScreenProps {}

@inject('rootStore')
@observer
export default class ProfileTabIndexScreen extends React.Component<ProfileTabIndexScreenProps> {
  render() {
    return (
      <Screen>
        <Text>Profile Tab</Text>
      </Screen>
    );
  }
}
