import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyle } from '../../Styles/GlobalStyle';
import RootStore from '../../Store/RootStore';
import Video from 'react-native-video';
import { inject, observer } from 'mobx-react/native';
import Screen from '../Components/Screen';

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Lato-Bold',
    fontSize: 36,
    color: 'white',
  }
});

export interface SplashScreenProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export default class SplashScreen extends React.Component<SplashScreenProps> {
  componentDidMount(): void {
    // setTimeout(() => {
      // this.props.rootStore!.navigation.reset('App');
    // }, 500);
    this.props.rootStore!.navigation.reset('Accept');

  }

  render() {
    return (
      <Screen style={GlobalStyle.centered}>
        <Video
          style={GlobalStyle.containerAbsolute}
          source={require('../../Assets/Videos/intro.mp4')}
          rate={1.0}
          volume={0}
          muted={true}
          ignoreSilentSwitch={undefined}
          paused={false}
          resizeMode="cover"
          repeat={true}
        />
        <View style={GlobalStyle.transparentOverlay}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Genesis Drive</Text>
          </View>
        </View>
      </Screen>
    );
  }
}
