/**
 * @flow
 * Created by andreaskarantzas on 21.12.17.
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../../Styles';

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(168,168,168,0.6)',
    ...Platform.select({
      ios: {
        paddingTop: 2,
      },
    }),
    ...Theme.center,
  },
});

interface Props {
  onPress: () => void;
  size?: number;
}

export default class RoundedCloseButton extends React.Component<Props> {
  render() {
    const { onPress, size } = this.props;
    return (
      <TouchableOpacity hitSlop={Theme.HIT_SLOP} style={styles.container} onPress={onPress}>
        <Icon name="close" color={Theme.Colors.white} size={size || 28} />
      </TouchableOpacity>
    );
  }
}
