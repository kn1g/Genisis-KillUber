/**
 * @flow
 * Created by joser on 24.06.2016.
 */

import React from 'react';
import { observer } from 'mobx-react/native';
import MaterialInput, { InputProps } from './MaterialInput';

@observer
export default class EmailInput extends React.Component<InputProps> {
  render() {
    return (
      <MaterialInput
        onChangeText={this.props.onChangeText}
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        maxLength={128}
        {...this.props}
      />
    );
  }
}
