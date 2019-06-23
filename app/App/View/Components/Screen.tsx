import React from 'react';
import { Platform, SafeAreaView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { GlobalStyle } from '../../Styles/GlobalStyle';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export interface ScreenProps {
  style?: StyleProp<ViewStyle>;
}

@inject('rootStore')
@observer
export default class Screen extends React.Component<ScreenProps> {
  render() {
    const {
      props: { style, children },
    } = this;
    return <SafeAreaView style={[GlobalStyle.container, styles.container, style]}>{children}</SafeAreaView>;
  }
}
