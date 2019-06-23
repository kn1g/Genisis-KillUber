// based on react-native-paper

import * as React from 'react';
import {
  View,
  Animated,
  TextInput,
  StyleSheet,
  I18nManager,
  Text,
  TextInputProps,
  TextStyle,
  StyleProp,
} from 'react-native';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import color from 'color';
import Theme from '../../../Styles';
import TouchableIcon from '../TouchableIcon';

const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    left: 0,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  placeholderFlat: {
    top: 19,
  },
  placeholderOutlined: {
    top: 25,
  },
  underline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
  },
  outline: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 6,
    bottom: 0,
  },
  outlinedLabelBackground: {
    position: 'absolute',
    top: 0,
    left: 8,
    paddingHorizontal: 4,
    color: 'white',
  },
  input: {
    flexGrow: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    margin: 0,
    minHeight: 56,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  inputOutlined: {
    paddingTop: 20,
    paddingBottom: 16,
    minHeight: 64,
  },
  inputFlatWithLabel: {
    paddingTop: 24,
    paddingBottom: 6,
  },
  inputFlatWithoutLabel: {
    paddingVertical: 15,
  },
  icon: {
    position: 'absolute',
    top: 24,
    right: 16,
  },
});

const AnimatedText = Animated.createAnimatedComponent(Text);

const MINIMIZED_LABEL_Y_OFFSET = -12;
const OUTLINE_MINIMIZED_LABEL_Y_OFFSET = -29;
const MAXIMIZED_LABEL_FONT_SIZE = 16;
const MINIMIZED_LABEL_FONT_SIZE = 12;
const LABEL_WIGGLE_X_OFFSET = 4;
const FOCUS_ANIMATION_DURATION = 150;
const BLUR_ANIMATION_DURATION = 180;

export interface InputProps extends TextInputProps {
  inputRef?: React.Ref<TextInput>;
  style?: StyleProp<TextStyle>;
  mode?: 'flat' | 'outlined' | 'transparentFlat';
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  error?: boolean;
  underlineColor?: string;
  multiline?: boolean;
  inputStyle?: StyleProp<TextStyle>;
}

interface State {
  labeled: Animated.Value;
  error: Animated.Value;
  focused: boolean;
  placeholder?: string;
  value?: string;
  labelLayout: {
    measured: boolean;
    width: number;
  };
}

@observer
export default class MaterialInput extends React.Component<InputProps, State> {
  static defaultProps = {
    mode: 'flat',
    disabled: false,
    error: true,
    multiline: false,
    editable: true,
    secureTextEntry: false,
  };

  @observable passwordVisibility: boolean = false;

  state = {
    labeled: new Animated.Value(this.props.value || this.props.error ? 0 : 1),
    error: new Animated.Value(this.props.error ? 1 : 0),
    focused: false,
    placeholder: this.props.error ? this.props.placeholder : '',
    value: this.props.value,
    labelLayout: {
      measured: false,
      width: 0,
    },
  };
  _timer: any;
  _root?: any;

  componentDidMount() {
    const { secureTextEntry } = this.props;
    if (secureTextEntry) {
      this.passwordVisibility = true;
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.focused !== this.state.focused || prevState.value !== this.state.value) {
      if (this.state.value || this.state.focused || this.props.error) {
        this._minmizeLabel();
      } else {
        this._restoreLabel();
      }
    }

    if (prevState.focused !== this.state.focused || prevProps.label !== this.props.label) {
      if (this.state.focused || this.props.error || !this.props.label) {
        this.showPlaceholder();
      } else {
        this.hidePlaceholder();
      }
    }

    if (prevProps.error !== this.props.error) {
      if (this.props.error) {
        this.showError();
      } else {
        this._hideError();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  showPlaceholder = () => {
    clearTimeout(this._timer);
    this._timer = setTimeout(
      () =>
        this.setState({
          placeholder: this.props.placeholder,
        }),
      50,
    );
  };

  hidePlaceholder = () =>
    this.setState({
      placeholder: '',
    });

  showError = () => {
    Animated.timing(this.state.error, {
      toValue: 1,
      duration: FOCUS_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(this.showPlaceholder);
  };

  _hideError = () => {
    Animated.timing(this.state.error, {
      toValue: 0,
      duration: BLUR_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  _restoreLabel = () =>
    Animated.timing(this.state.labeled, {
      toValue: 1,
      duration: FOCUS_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();

  _minmizeLabel = () =>
    Animated.timing(this.state.labeled, {
      toValue: 0,
      duration: BLUR_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();

  _handleFocus = (...args: any) => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ focused: true });

    if (this.props.onFocus) {
      // @ts-ignore
      this.props.onFocus(...args);
    }
  };

  _handleBlur = (...args: any) => {
    if (this.props.disabled) {
      return;
    }

    this.setState({ focused: false });

    if (this.props.onBlur) {
      // @ts-ignore
      this.props.onBlur(...args);
    }
  };

  _handleChangeText = (value: string) => {
    if (!this.props.editable) {
      return;
    }

    this.setState({ value });
    this.props.onChangeText && this.props.onChangeText(value);
  };

  changePasswordVisibility = () => {
    this.passwordVisibility = !this.passwordVisibility;
  };

  setNativeProps(...args: any) {
    return this._root && this._root.setNativeProps(...args);
  }

  isFocused() {
    return this._root && this._root.isFocused();
  }

  clear() {
    return this._root && this._root.clear();
  }

  focus() {
    return this._root && this._root.focus();
  }

  blur() {
    return this._root && this._root.blur();
  }

  handleLayoutAnimatedText = (e: any) =>
    this.setState({
      labelLayout: {
        width: e.nativeEvent.layout.width,
        measured: true,
      },
    });

  render() {
    const {
      mode,
      disabled,
      label,
      error,
      underlineColor,
      style,
      secureTextEntry,
      inputStyle,
      inputRef,
      ...rest
    } = this.props;

    const fontFamily = Theme.Typography.font.normal;
    const hasActiveOutline = this.state.focused || error;
    const { backgroundColor = Theme.Colors.white } = StyleSheet.flatten(style) || {};

    let inputTextColor;
    let activeColor;
    let underlineColorCustom;
    let outlineColor;
    let placeholderColor;
    let containerStyle;

    if (disabled) {
      inputTextColor = activeColor = color(Theme.Colors.charcoalGrey)
        .alpha(0.54)
        .rgb()
        .string();
      placeholderColor = outlineColor = Theme.Colors.primaryColor;
      underlineColorCustom = 'transparent';
    } else {
      inputTextColor = Theme.Colors.charcoalGrey;
      activeColor = error ? Theme.Colors.errorColor : Theme.Colors.primaryColor;
      placeholderColor = outlineColor = Theme.Colors.charcoalGrey;
      underlineColorCustom = underlineColor || Theme.Colors.disabled;
    }

    if (mode === 'flat') {
      containerStyle = {
        backgroundColor: Theme.Colors.lightestGrey,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: this.isFocused() ? 0 : 8,
        borderBottomRightRadius: this.isFocused() ? 0 : 8,
      };
    }

    if (mode === 'transparentFlat') {
      containerStyle = {
        backgroundColor: 'rgba(232,232,232, 0.85)',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: this.isFocused() ? 0 : 8,
        borderBottomRightRadius: this.isFocused() ? 0 : 8,
      };
    }

    const labelStyle = {
      fontFamily,
      fontSize: MAXIMIZED_LABEL_FONT_SIZE,
      transform: [
        {
          translateX: this.state.error.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, this.state.value && error ? LABEL_WIGGLE_X_OFFSET : 0, 0],
          }),
        },
        {
          translateY: this.state.labeled.interpolate({
            inputRange: [0, 1],
            outputRange: [mode === 'outlined' ? OUTLINE_MINIMIZED_LABEL_Y_OFFSET : MINIMIZED_LABEL_Y_OFFSET, 0],
          }),
        },
        {
          scale: this.state.labeled.interpolate({
            inputRange: [0, 1],
            outputRange: [MINIMIZED_LABEL_FONT_SIZE / MAXIMIZED_LABEL_FONT_SIZE, 1],
          }),
        },
        {
          translateX: this.state.labeled.interpolate({
            inputRange: [0, 1],
            outputRange: [
              -(1 - MINIMIZED_LABEL_FONT_SIZE / MAXIMIZED_LABEL_FONT_SIZE) * (this.state.labelLayout.width / 2),
              0,
            ],
          }),
        },
      ],
    };

    return (
      <View style={[containerStyle, style]}>
        {mode === 'outlined' ? (
          <View
            style={[
              styles.outline,
              {
                borderRadius: 8,
                borderWidth: hasActiveOutline ? 1.5 : 0.7,
                borderColor: hasActiveOutline ? activeColor : outlineColor,
              },
            ]}
          />
        ) : null}
        {mode === 'outlined' && label ? (
          <AnimatedText
            pointerEvents="none"
            style={[
              styles.outlinedLabelBackground,
              {
                backgroundColor,
                fontFamily,
                fontSize: MINIMIZED_LABEL_FONT_SIZE,
                opacity: this.state.labeled.interpolate({
                  inputRange: [0, 0.9, 1],
                  outputRange: [1, 1, 0],
                }),
                transform: [
                  {
                    scaleX: this.state.labeled.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                  },
                ],
              },
            ]}
            numberOfLines={1}
          >
            {label}
          </AnimatedText>
        ) : null}
        {mode === 'flat' ? (
          <Animated.View
            style={[
              styles.underline,
              {
                backgroundColor: error ? Theme.Colors.error : this.state.focused ? activeColor : underlineColorCustom,
                transform: [{ scaleY: this.state.focused ? 1 : 0.5 }],
              },
            ]}
          />
        ) : null}
        {label ? (
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              {
                opacity: this.state.value || this.state.focused ? (this.state.labelLayout.measured ? 1 : 0) : 1,
              },
            ]}
          >
            <AnimatedText
              onLayout={this.handleLayoutAnimatedText}
              style={[
                styles.placeholder,
                mode === 'outlined' ? styles.placeholderOutlined : styles.placeholderFlat,
                labelStyle,
                {
                  color: activeColor,
                  opacity: this.state.labeled.interpolate({
                    inputRange: [0, 1],
                    outputRange: [hasActiveOutline ? 1 : 0, 0],
                  }),
                },
              ]}
              numberOfLines={1}
            >
              {label}
            </AnimatedText>
            <AnimatedText
              style={[
                styles.placeholder,
                mode === 'outlined' ? styles.placeholderOutlined : styles.placeholderFlat,
                labelStyle,
                {
                  color: placeholderColor,
                  opacity: hasActiveOutline ? this.state.labeled : 1,
                },
              ]}
              numberOfLines={1}
            >
              {label}
            </AnimatedText>
          </View>
        ) : null}

        <TextInput
          {...rest}
          ref={inputRef}
          onChangeText={this._handleChangeText}
          placeholder={label ? this.state.placeholder : this.props.placeholder}
          placeholderTextColor={Theme.Colors.lightGrey}
          editable={!disabled}
          selectionColor={activeColor}
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          underlineColorAndroid={'transparent'}
          secureTextEntry={this.passwordVisibility}
          style={[
            styles.input,
            mode === 'outlined'
              ? styles.inputOutlined
              : this.props.label
              ? styles.inputFlatWithLabel
              : styles.inputFlatWithoutLabel,
            {
              color: inputTextColor,
              fontFamily,
            },
            inputStyle,
          ]}
        />
        {secureTextEntry ? (
          <TouchableIcon
            mci={true}
            style={styles.icon}
            name={this.passwordVisibility ? 'eye' : 'eye-off'}
            onPress={this.changePasswordVisibility}
          />
        ) : null}
      </View>
    );
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    return {
      value: typeof nextProps.value !== 'undefined' ? nextProps.value : prevState.value,
    };
  }
}
