import React, { Component } from 'react';
import { useScreens } from 'react-native-screens';
import './Config/ReactotronConfig';
import AppNavigation from './View/Navigation/Navigation';
import { Provider } from 'mobx-react/native';
import RootStore from './Store/RootStore';
import { NavigationAction, NavigationContainerComponent, NavigationState } from 'react-navigation';

useScreens();

export default class App extends React.Component {
  rootStore: RootStore = new RootStore(__DEV__);

  handleNavigationStateChange = (prevState: NavigationState, newState: NavigationState, action: NavigationAction) => {
    this.rootStore.navigation.processNavigationStateChange(prevState, newState, action);
  };

  setNavigationRef = (container: NavigationContainerComponent) => {
    this.rootStore.navigation.setNavigationContainer(container);
  };

  getPersistenceFunctions() {
    return __DEV__
      ? {
          persistNavigationState: (navState: NavigationState) =>
            this.rootStore.navigation.persistNavigationState(navState),
          loadNavigationState: () => this.rootStore.navigation.loadNavigationState(),
        }
      : undefined;
  }

  render() {
    const { rootStore } = this;
    return (
      <Provider rootStore={rootStore}>
        <AppNavigation
          ref={this.setNavigationRef}
          onNavigationStateChange={this.handleNavigationStateChange}
          {...this.getPersistenceFunctions()}
        />
      </Provider>
    );
  }
}
