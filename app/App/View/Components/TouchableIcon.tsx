import React from 'react';
import { TouchableOpacity, ViewStyle, StyleProp, Insets } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import Theme from '../../Styles';

interface Props {
  name: string;
  onPress?: () => any;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  hitSlop?: Insets;
}

export default class TouchableIcon extends React.Component<Props> {
  static defaultProps = {
    size: 24,
    color: Theme.Colors.primaryColor,
  };

  render() {
    const { name, color, size, style, hitSlop, onPress } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={style} hitSlop={hitSlop}>
        <MCI name={name} color={color} size={size} />
      </TouchableOpacity>
    );
  }
}
