import type { NuxtAppConfig } from '@nuxt/schema';

export const head: NuxtAppConfig['head'] = {
  title: 'Waxpeer',
  meta: [
    { name: 'description', content: 'Buy & Sell skins on the WAXPEER P2P market. Best prices on cheap & expensive skins.' },
  ],
  link: [
    { rel: 'preconnect', href: 'https://imageproxy.waxpeer.com' },
  ],
};
