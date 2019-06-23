/**
 * @flow
 * Created by andreaskarantzas on 19.12.17.
 */

import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { observer } from 'mobx-react/native';
import {GlobalStyle} from '../../../Styles/GlobalStyle';
import Theme from '../../../Styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.Colors.primaryColor,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: Theme.Typography.font.bold,
    color: Theme.Colors.white,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

interface Props {
  text: string;
  onPress?: () => any;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  flat?: boolean;
}

@observer
export default class MainButton extends React.Component<Props> {
  handlePress = () => {
    const { disabled, onPress } = this.props;
    if (!disabled && onPress) {
      onPress();
    }
  };

  render() {
    const { text, style, disabled, flat, textStyle } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, !flat ? GlobalStyle.darkerShadow : null, style, disabled ? styles.disabled : null]}
        onPress={this.handlePress}
        disabled={disabled}
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
