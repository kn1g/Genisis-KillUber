import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import ProfileTabIndexScreen from '../Profile/ProfileTabIndexScreen';
import MapsTabIndexScreen from '../Maps/MapsTabIndexScreen';
import HistoryTabIndexScreen from '../History/HistoryTabIndexScreen';
import HalfBottomDriverSelectionModal from '../Maps/HalfBottomDriverSelectionModal';

const ProfileTabStack = createStackNavigator(
  {
    ProfileTabIndexScreen: {
      screen: ProfileTabIndexScreen,
    },
  },
  {
    initialRouteName: 'ProfileTabIndexScreen',
  },
);

const MapsTabStack = createStackNavigator(
  {
    MapsTabIndexScreen: {
      screen: MapsTabIndexScreen,
      navigationOptions: {
        header: null,
      }
    },
  }, {
    initialRouteName: 'MapsTabIndexScreen',
    mode: 'modal',
    transparentCard: true,
  }
);

const HistoryTabsStack = createStackNavigator(
  {
    HistoryTabIndexScreen: {
      screen: HistoryTabIndexScreen,
    },
  },
  {
    initialRouteName: 'HistoryTabIndexScreen',
  },
);

const AppStack = createBottomTabNavigator(
  {
    ProfileTab: {
      screen: ProfileTabStack,
      navigationOptions: {
        title: 'Profile',
        tabBarLabel: 'Profile',
      },
    },
    MapsTab: {
      screen: MapsTabStack,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Drive',
      },
    },
    HistoryTab: {
      screen: HistoryTabsStack,
      navigationOptions: {
        title: 'History',
        tabBarLabel: 'History',
      },
    },
  },
  {
    initialRouteName: 'MapsTab',
  },
);

export default AppStack;
