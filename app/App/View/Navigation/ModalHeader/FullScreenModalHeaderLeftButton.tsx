import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Theme from '../../../Styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
    paddingRight: 8,
  },
  text: {
    marginRight: 4,
    fontSize: 16,
    fontFamily: Theme.Typography.font.normal,
    color: Theme.Colors.black,
    textAlign: 'center',
  },
});

interface Props {
  onPress: () => any;
  title: string;
}

export default class FullScreenModalHeaderLeftButton extends React.Component<Props> {
  static defaultProps = {
    onPress: () => {},
  };

  render() {
    const {
      props: { onPress, title },
    } = this;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
