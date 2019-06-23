import React from 'react';
import { SectionListProps, SectionList, SectionListData } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import RootStore from '../../Store/RootStore';

interface Props<T> extends SectionListProps<T> {
  rootStore?: RootStore;
  sections: Array<SectionListData<T>>;
}

@inject('rootStore')
@observer
export default class DismissKeyboardSectionList<T> extends React.Component<Props<T>> {
  onScrollBeginDrag = (e: any) => {
    this.props.rootStore!.keyboard.dismiss();
    this.props.onScrollBeginDrag && this.props.onScrollBeginDrag(e);
  };

  render() {
    // noinspection JSUnusedLocalSymbols
    const {
      props: { onScrollBeginDrag, ...otherProps },
    } = this;
    return <SectionList {...otherProps} onScrollBeginDrag={this.onScrollBeginDrag} />;
  }
}
