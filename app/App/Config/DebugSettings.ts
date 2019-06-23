// noinspection JSUnusedLocalSymbols
const PRODUCTION: any = {
  yellowBox: false,
  enableReactotron: false, // __DEV__,
  enableSnoopy: false,
  mobxSpy: false,
  useDevBackend: false, // __DEV__,
  codePushDisabled: false,
  isBetaApp: false,
  authToken: null,
};

// noinspection JSUnusedLocalSymbols
const DEVELOPMENT: any = {
  yellowBox: true,
  enableReactotron: true, // __DEV__,
  enableSnoopy: false,
  mobxSpy: false,
  useDevBackend: false, // __DEV__,
  codePushDisabled: __DEV__,
  manualTrackingEnabled: false,
  isBetaApp: false,
  authToken: undefined,
};

// noinspection JSUnusedLocalSymbols
const PRODUCTION_TEST = {
  yellowBox: false,
  enableReactotron: false, // __DEV__,
  enableSnoopy: false,
  mobxSpy: false,
  useDevBackend: false, // __DEV__,
  codePushDisabled: true,
  isBetaApp: false,
  authToken: null,
};

const DebugSettings = DEVELOPMENT;

export default DebugSettings;
