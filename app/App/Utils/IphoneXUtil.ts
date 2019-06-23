import {Dimensions, Platform, StatusBar, TextStyle, ViewStyle} from 'react-native';

export function isIphoneX() {
  const { height, width } = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || (height === 896 || width === 896))
  );
}

export function ifIphoneX(iphoneXStyle: ViewStyle | TextStyle | any, regularStyle: ViewStyle | TextStyle | any): ViewStyle | TextStyle | any {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe: boolean = true) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}
