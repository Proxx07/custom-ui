import type { NuxtPage } from '@nuxt/schema';

const CATALOG_FILE = '@/pages/[game]/[[brand]]/[[category]].vue';

export const hooks = {
  'prepare:types': function (option: any) {
    const paths = option.tsConfig.compilerOptions?.paths;
    if (!paths) return;
    delete paths['~'];
    delete paths['~/*'];
  },

  'pages:extend': function (pages: NuxtPage[]) {
    const idx = pages.findIndex(p =>
      p.file?.replace(/\\/g, '/').endsWith('pages/[game]/[[brand]]/[[category]].vue'),
    );
    if (idx !== -1) pages.splice(idx, 1);

    pages.push(
      {
        name: 'catalog-csgo',
        path: '/:brand?/:category?',
        file: CATALOG_FILE,
      },

      {
        name: 'catalog-rust',
        path: `/:game(rust)/:brand?/:category?`,
        file: CATALOG_FILE,
      },

      {
        name: 'catalog-tf2',
        path: `/:game(tf2)/:brand?/:category?`,
        file: CATALOG_FILE,
      },

      {
        name: 'catalog-dota2',
        path: `/:game(dota2)/:brand?/:category?`,
        file: CATALOG_FILE,
      },
    );
  },
};
