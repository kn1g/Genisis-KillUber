import { Platform, ViewStyle, TextStyle } from 'react-native';

const ConfigTheme: ViewStyle & TextStyle & any = {
  shadow: Platform.select({
    ios: {
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowColor: 'rgba(0,0,0,0.50)',
      shadowOffset: {
        height: 5,
        width: 1,
      },
    },
    android: {
      elevation: 6,
    },
  }),
  darkerShadow: Platform.select({
    ios: {
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowColor: 'rgba(0,0,0,1)',
      shadowOffset: {
        height: 5,
        width: 1,
      },
    },
    android: {
      elevation: 6,
    },
  }),
  navShadow: Platform.select({
    ios: {
      shadowOpacity: 0.15,
      shadowRadius: 3,
      shadowColor: 'rgba(0,0,0,0.50)',
      shadowOffset: {
        height: 2,
        width: 2,
      },
    },
    android: {
      elevation: 1,
    },
  }),
  HIT_SLOP: {
    top: 16,
    bottom: 16,
    left: 16,
    right: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNormal: {
    fontFamily: 'Lato-Regular',
  },
  textTitle: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
  }
};

export default ConfigTheme;
