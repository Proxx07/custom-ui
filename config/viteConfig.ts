export const viteConfig = {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "~/assets/styles/mixins.scss" as *;',
      },
    },
  },
};
