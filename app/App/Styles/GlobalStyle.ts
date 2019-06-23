import {Platform, StyleSheet} from 'react-native';

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAbsolute: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  transparentOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
});