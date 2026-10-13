import type { NuxtAppConfig } from '@nuxt/schema';

export const head: NuxtAppConfig['head'] = {
  link: [
    { rel: 'preconnect', href: 'https://imageproxy.waxpeer.com' },
  ],
};
