/**
 * Created by joser on 24.06.2016.
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';
import MaterialInput, { InputProps } from './MaterialInput';

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
  }
});

@observer
export default class NumberInput extends React.Component<InputProps> {
  render() {
    // noinspection JSUnusedLocalSymbols
    const {
      props: { keyboardType, maxLength, autoCapitalize, ...otherProps },
    } = this;
    return <MaterialInput {...otherProps} inputStyle={styles.input} keyboardType={'numeric'} maxLength={32} autoCapitalize="none" />;
  }
}
