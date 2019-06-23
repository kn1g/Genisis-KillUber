import {action, computed, observable, toJS} from 'mobx';
import {
  NavigationAction,
  NavigationActions,
  NavigationContainerComponent, NavigationRoute,
  NavigationStackAction, NavigationState,
  StackActions,
  SwitchActions
} from 'react-navigation';
import AppStorage from '../../Services/AppStorage';

export default class NavigationStore {
  @observable
  private previousRoute?: NavigationRoute;
  @observable
  private currentRoute: NavigationRoute = {
    routeName: 'SplashScreen'
  };
  @observable
  private currentId?: string;

  // TODO find correct type
  @observable
  private navigator?: NavigationContainerComponent;
  @observable
  private navigationState?: NavigationState;

  @computed
  get currentScene(): string {
    return this.currentRoute.routeName;
  }

  /**
   * Navigates to the desired screen. Does not allow to push the same scene multiple times.
   * @param routeName
   * @params params
   */
  public navigate(routeName: string, params?: any) {
    this.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }

  /**
   * The reset action wipes the whole navigation state and replaces it with the result of several actions.
   * @param routeName
   * @param params
   */
  public reset(routeName: string, params?: any) {
    this.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName, params })],
      }),
    );
  }

  /**
   * The replace action replaces the route at the given key with another route.
   * @param routeName
   * @param params
   */
  public replace(routeName: string, params?: any) {
    this.dispatch(
      StackActions.replace({
        routeName,
        params,
      }),
    );
  }

  /**
   * Pushes the new screen. Allows to navigate multiple times to the same screen.
   * @param routeName
   * @param params
   */
  public push(routeName: string, params?: any) {
    this.dispatch(
      StackActions.push({
        routeName,
        params,
      }),
    );
  }

  /**
   * SwitchActions is an object containing methods for generating actions specific to switch-based navigators. Its methods expand upon the actions available in NavigationActions.
   * @param routeName
   * @param params
   */
  public jumpTo(routeName: string, params?: any) {
    this.dispatch(SwitchActions.jumpTo({
      routeName,
      params,
    }));
  }

  /**
   * Goes back in the stack
   * TODO if the stack is mode 'modal' it goes back screen by screen instead of closing the whole modal stack
   */
  public goBack(key?: string) {
    this.dispatch(
      NavigationActions.back({
        key
        // key: key || (this.previousRoute ? this.previousRoute.key : undefined),
      }),
    );
  }

  /**
   * Alias for goBack
   * @param key
   */
  public pop(key?: string) {
    this.goBack(key);
  }

  @action
  public processNavigationStateChange(prevState: NavigationState, newState: NavigationState, action: NavigationAction) {
    // await COMPLETE_TRANSITION to prevent double processing
    // TODO observe if it behaves well
    if (__DEV__) {
      console.log('scene', this.currentScene, prevState, newState, action);
    }
    if (action.type === 'Navigation/COMPLETE_TRANSITION' || action.type === 'Navigation/RESET' || action.type === 'Navigation/REPLACE') {
      this.currentRoute = this.traverseState(newState.routes[newState.index]);
      this.previousRoute = this.traverseState(prevState.routes[prevState.index]);
      this.navigationState = newState;
    }
  }

  @action
  public setNavigationContainer(container: NavigationContainerComponent) {
    console.log('NavContainer set');
    this.navigator = container;
  }

  public persistNavigationState(navState: NavigationState): Promise<any> {
    if (__DEV__) {
      this.navigationState = navState;
      return Promise.resolve();
    }
    return AppStorage.default.store('navigationState', toJS(this.navigationState));
  }

  public loadNavigationState(): Promise<any> {
    if (__DEV__) {
      return Promise.resolve(this.navigationState);
    }
    return AppStorage.default.get('navigationState');
  }

  private traverseState(navigationRoute: NavigationRoute): NavigationRoute {
    if (navigationRoute.routes) {
      return this.traverseState(navigationRoute.routes[navigationRoute.index]);
    }
    return navigationRoute;
  }

  private dispatch(options: NavigationStackAction) {
    if (this.navigator) {
      this.navigator.dispatch(options);
    } else {
      console.error('Navigator not set');
    }
  }
}
