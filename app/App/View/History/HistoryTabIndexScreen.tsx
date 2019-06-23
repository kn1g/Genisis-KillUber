import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Screen from '../Components/Screen';

const styles = StyleSheet.create({});

export interface HistoryTabIndexScreenProps {}

@inject('rootStore')
@observer
export default class HistoryTabIndexScreen extends React.Component<HistoryTabIndexScreenProps> {
  render() {
    return (
      <Screen>
        <Text>Tab</Text>
      </Screen>
    );
  }
}
