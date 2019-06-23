/**
 * Created by neo on 2019-06-23
 */
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { computed, observable } from 'mobx';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 32,
    borderColor: 'lightgray',
    borderWidth: 0.5,
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  positiveText: {
    color: 'white',
    fontSize: 18,
  },
  positive: {
    backgroundColor: '#EA0B8C',
    borderWidth: 0,
  }
});

export interface AcceptDeclineButtonProps {
  text: string;
  positive?: boolean;
  style?: StyleProp<ViewStyle>,
  onPress?: () => any;
}

@inject('rootStore')
@observer
export default class AcceptDeclineButton extends React.Component<AcceptDeclineButtonProps> {
  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.positive ? styles.positive : undefined, this.props.style]} onPress={this.props.onPress}>
        <Text style={[styles.text, this.props.positive ? styles.positiveText : undefined]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}