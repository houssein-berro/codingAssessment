import { getStateFromPath as defaultGetStateFromPath } from '@react-navigation/native';

export const linking = {
  prefixes: ['myapp://myapp.com', 'https://myapp.com'],
  config: {
    screens: {
      Main: {
        screens: {
          SettingsStack: {
            screens: {
              SetCompanyID: 'set-company-id',
            },
          },
        },
      },
    },
  },
  getStateFromPath: (path, options) => {
    console.log('Parsing path:', path);
    const state = defaultGetStateFromPath(path, options);
    console.log('Resulting navigation state:', JSON.stringify(state, null, 2));
    return state;
  },
};
