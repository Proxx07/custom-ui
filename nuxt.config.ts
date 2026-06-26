// https://nuxt.com/docs/api/configuration/nuxt-config
import { colorModeConfig, hooks, viteConfig } from './config';
import { COOKIE_LOCALE_KEY, DEFAULT_LANGUAGE, localeItems } from './i18n/constants';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  experimental: {
    viewTransition: false,
  },

  css: ['~/assets/styles/global.scss'],

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  i18n: {
    defaultLocale: DEFAULT_LANGUAGE,
    strategy: 'prefix_except_default',
    vueI18n: 'config.ts',
    locales: localeItems,
    langDir: 'locales',
    compilation: {
      strictMessage: false,
    },

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: COOKIE_LOCALE_KEY,
      redirectOn: 'root',
    },
  },

  hooks,

  imports: {
    scan: false,
  },

  components: {
    dirs: [],
  },

  colorMode: colorModeConfig,

  typescript: {
    typeCheck: true,
  },
  vite: viteConfig,
});
