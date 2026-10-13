import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export const viteConfig = {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "~/assets/styles/mixins.scss" as *;',
      },
    },
  },

  plugins: [
    cssInjectedByJsPlugin(),
  ],

  build: {
    assetsInlineLimit(filePath: string) {
      if (filePath.includes('assets/icons/skins')) return true;
      return undefined;
    },
  },
};
