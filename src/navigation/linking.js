import { getStateFromPath as defaultGetStateFromPath } from '@react-navigation/native';

export const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Onboarding: 'onboarding',
      MainStack: {
        screens: {
          MainScreen: 'main',
          SettingsStack: {
            path: 'settings',
            screens: {
              Settings: '',
              SetCompanyID: 'setcompanyid',
            },
          },
        },
      },
    },
  },
  getStateFromPath: (path, options) => defaultGetStateFromPath(path, options),
};
