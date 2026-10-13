import type { ModuleOptions } from '@nuxtjs/color-mode';

export const colorModeConfig: ModuleOptions = {
  preference: 'dark',
  fallback: 'dark',
  globalName: '__NUXT_COLOR_MODE__',
  componentName: 'ColorScheme',
  storage: 'cookie',
  classPrefix: '',
  classSuffix: '',
  dataValue: '',
  storageKey: 'nuxt-color-mode',
};
