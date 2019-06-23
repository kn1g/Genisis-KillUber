
if (!__DEV__) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

const Config = {
  backend: {
    eos: 'http://192.168.231.9:8888'
  },
  logLevel: 'info',
  gmapsApiKey: 'AIzaSyDzb5g-FUUlDPl8E5lM_NHSYGxGPzBsIt0',
};

export default Config;
