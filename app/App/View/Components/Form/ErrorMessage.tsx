/**
 * @flow
 * Created by neo on 21.01.17.
 */

import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import Theme from '../../../Styles';

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  text: {
    color: Theme.Colors.errorColor,
    fontSize: 14,
    fontFamily: Theme.Typography.font.normal,
  },
});

interface Props {
  message: string;
  show?: boolean;
}

@observer
export default class ErrorMessage extends React.Component<Props> {
  @observable
  opacity: any = new Animated.Value(0);
  @observable
  showView: boolean = false;
  animation: any;

  componentDidUpdate(prevProps: Props) {
    if (!this.props.show && prevProps.show) {
      this.showView = true;
      this.animation = Animated.timing(this.opacity, { toValue: 1, duration: 450 }).start();
    } else if (this.props.show && !prevProps.show) {
      this.animation = Animated.timing(this.opacity, {
        toValue: 0,
        duration: 500,
      }).start(() => {
        this.showView = false;
      });
    }
  }

  render() {
    if (this.props.show) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.message}</Text>
        </View>
      );
    }
    return null;
  }
}
