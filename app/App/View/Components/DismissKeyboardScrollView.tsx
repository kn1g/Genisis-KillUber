/**
 * @flow
 * Created by neo on 20.01.17.
 */
import React from 'react';
import { ScrollView, ScrollViewProps} from 'react-native';
import { observer, inject } from 'mobx-react/native';
import RootStore from '../../Store/RootStore';

interface Props extends ScrollViewProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class DismissKeyboardScrollView extends React.Component<Props> {
  onKeyboardDismiss = (e: any) => {
    const { rootStore } = this.props;
    rootStore!.keyboard.dismiss();
    this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e);
  };

  render() {
    // noinspection JSUnusedLocalSymbols
    const { children, showsVerticalScrollIndicator, onScrollBeginDrag, ...otherProps } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false} onScrollBeginDrag={this.onKeyboardDismiss} {...otherProps}>
        {children}
      </ScrollView>
    );
  }
}
