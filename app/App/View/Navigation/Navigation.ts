import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import SplashScreen from './SplashScreen';
import AppStack from './AppNavigation';
import AcceptScreen from '../Driver/AcceptScreen';
import RatingScreen from '../Maps/Rating/RatingScreen';

const AppNavigator = createStackNavigator(
  {
    // SplashScreen: {
    //   screen: SplashScreen,
    // },
    App: {
      screen: AppStack,
      navigationOptions: {
        header: null,
      }
    },
    Rating: {
      screen: RatingScreen,
      navigationOptions: {
        title: 'Rating'
      }
    },
    Accept: {
      screen: AcceptScreen,
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    initialRouteName: 'App',
    defaultNavigationOptions: {
    },
  },
);

const NavigationContainer = createAppContainer(AppNavigator);
export default NavigationContainer;
