/**
 * Created by joser on 24.06.2016.
 */

import React from 'react';
import { observer } from 'mobx-react/native';
import MaterialInput, { InputProps } from './MaterialInput';

@observer
export default class PasswordInput extends React.Component<InputProps> {
  render() {
    return <MaterialInput secureTextEntry={true} maxLength={40} autoCapitalize="none" {...this.props} />;
  }
}
