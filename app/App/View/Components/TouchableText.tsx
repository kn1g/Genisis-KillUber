import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle, StyleProp } from 'react-native';

interface Props {
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
  text: string;
  style?: StyleProp<ViewStyle>;
  hitSlop?: any;
}

export default class TouchableText extends React.Component<Props> {
  onPress = () => {
    const { onPress } = this.props;
    onPress && onPress();
  };
  render() {
    const { text, textStyle, style, hitSlop } = this.props;
    return (
      <TouchableOpacity onPress={this.onPress} style={style} hitSlop={hitSlop}>
        <Text allowFontScaling={false} style={textStyle}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}
