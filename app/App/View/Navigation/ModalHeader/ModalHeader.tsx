import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { HeaderProps } from 'react-navigation';
import FullScreenModalHeaderLeftButton from './FullScreenModalHeaderLeftButton';
import RoundedCloseButton from '../../Components/Buttons/RoundedCloseButton';
import RootStore from '../../../Store/RootStore';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titleContainer: {
    flex: 1,
  },
  expand: {
    flex: 1,
  },
  closeContainer: {},
});

export interface ModalHeaderProps extends HeaderProps {
  onClose?: () => any;
  title?: any;
  onLeft?: () => any;
  rootStore: RootStore,
}

@inject('rootStore')
@observer
export default class ModalHeader extends React.Component<ModalHeaderProps> {
  handleOnLeftPress = () => {
    const { onLeft } = this.props;
    onLeft && onLeft();
  };

  handleOnClosePress = () => {
    const { onClose } = this.props;
    onClose && onClose();
    this.props.navigation.goBack();
    // this.props.rootStore!.navigation.goBack();
  };

  render() {
    const {
      props: { title },
    } = this;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {title ? (
            typeof title === 'string' ? (
              <FullScreenModalHeaderLeftButton title={title} onPress={this.handleOnLeftPress} />
            ) : (
              title
            )
          ) : null}
        </View>
        <View style={styles.closeContainer}>
          {<RoundedCloseButton onPress={this.handleOnClosePress} />}
        </View>
      </View>
    );
  }
}
