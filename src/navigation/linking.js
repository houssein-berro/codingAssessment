import { getStateFromPath as defaultGetStateFromPath } from '@react-navigation/native';

export const linking = {
  prefixes: ['myapp://myapp.com', 'https://myapp.com'],
  config: {
    screens: {
      MainScreen: 'MainScreen',
      Voicebot: 'voicebot',
    },
  },
  getStateFromPath: (path, options) => defaultGetStateFromPath(path, options),
};
