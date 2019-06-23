/**
 * @flow
 */
import Reactotron from 'reactotron-react-native';
// import { trackGlobalErrors } from 'reactotron-react-native';
import { NativeModules, Platform } from 'react-native';
import DebugConfig from './DebugSettings';

if (DebugConfig.enableReactotron) {
  const {
    SourceCode: { scriptURL },
  } = NativeModules;
  const config: any = __DEV__
    ? { host: scriptURL.split('://')[1].split(':')[0], name: 'flinq' }
    : { host: '192.168.1.110', name: 'flinq' };

  // got some 'invalid host' errors
  if (Platform.OS === 'ios') {
    // const { SourceCode: { scriptURL } } = NativeModules;
    // config.host = scriptURL.split('://')[1].split(':')[0];
    // neo office
    // config = { host: '10.0.1.102', name: 'kinastic' };
    // neo
    // config = { host: '192.168.1.106', name: 'kinastic '};
    // office
    // config = { host: '10.0.1.157', name: 'kinastic' };
    // home
    // config = { host: '192.168.0.164', name: 'kinastic' };
    // mobile
    // config = { host:'172.20.10.2', name: 'kinastic' };
  } else if (Platform.OS === 'android') {
    // Galaxy S3
    // config = { host: '192.168.1.106' };
    // config = { host: '10.0.1.102', name: 'kinastic' };
  }

  Reactotron.configure(config)
    .useReactNative({})
    // .use(
    //   trackGlobalErrors({
    //     veto: (frame: any) => frame.fileName.indexOf('/node_modules/react-native/') >= 0,
    //   }),
    // )
    .connect();

  console.log = Reactotron.log as any;
  console.error = Reactotron.error as any;
  Reactotron.clear();
}
