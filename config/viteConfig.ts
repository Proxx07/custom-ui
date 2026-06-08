export const viteConfig = {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "~/assets/styles/responsive.scss" as *;',
      },
    },
  },
}