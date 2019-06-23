/* eslint-disable import/no-named-as-default-member */
/**
 * @flow
 * Created by joser on 24.06.2016.
 */

import React from 'react';
import {
  TextInput,
  StyleSheet,
  Animated,
  Platform,
  TextInputProps,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import Theme from '../../../Theme';
import TouchableIcon from '../TouchableIcon';

const styles = StyleSheet.create({
  container: {
    borderBottomColor: Theme.Colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      ios: {
        padding: 4,
        paddingBottom: 8,
        paddingLeft: 0,
        marginVertical: 16,
      },
    }),
  },
  input: {
    color: Theme.Colors.black,
  },
  icon: {
    position: 'absolute',
    ...Platform.select({
      android: {
        top: 16,
      },
    }),
    right: 8,
  },
});

const DEFAULT_OPACITY = 0.6;

export interface InputProps extends TextInputProps {
  inputRef?: React.Ref<TextInput>;
  style?: StyleProp<TextStyle>;
}

@observer
export default class Input extends React.Component<InputProps, any> {

  static defaultProps = {
    autoFocus: false,
    selectTextOnFocus: false,
    returnKeyType: 'next',
    keyboardType: 'default',
    autoCapitalize: 'sentences',
    placeholderTextColor: Theme.Colors.secondaryColor,
    value: '',
  };
  @observable
  opacity: any = new Animated.Value(DEFAULT_OPACITY);
  @observable
  passwordVisibility: boolean = false;

  constructor(props: InputProps) {
    super(props);
    this.passwordVisibility = !!props.secureTextEntry;
  }

  componentDidMount() {
    const { value: defaultValue, onChangeText, secureTextEntry } = this.props;

    if (defaultValue && onChangeText) {
      onChangeText(defaultValue);
    }
    this.passwordVisibility = !!secureTextEntry;
  }

  handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    Animated.timing(this.opacity, { toValue: 1, duration: 250 }).start();
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    Animated.timing(this.opacity, { toValue: 0.6, duration: 250 }).start();
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  changePasswordVisibility = () => {
    this.passwordVisibility = !this.passwordVisibility;
  };

  render() {
    const {
      opacity,
      passwordVisibility,
      props: { style, inputRef, secureTextEntry },
    } = this;
    return (
      <Animated.View style={[styles.container, { opacity }]}>
        <TextInput
          {...this.props}
          style={[styles.input, style]}
          underlineColorAndroid="transparent"
          selectionColor={Platform.OS === 'ios' ? Theme.Colors.black : null}
          placeholderTextColor={Theme.Colors.black}
          secureTextEntry={passwordVisibility}
          ref={inputRef}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {secureTextEntry ? (
          <TouchableIcon
            mci={true}
            style={styles.icon}
            name={passwordVisibility ? 'eye' : 'eye-off'}
            onPress={this.changePasswordVisibility}
          />
        ) : null}
      </Animated.View>
    );
  }
}
