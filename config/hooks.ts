import type { NuxtPage } from '@nuxt/schema';
import { GAMES_LIST } from '../app/composables/useGames';

const CATALOG_FILE = '@/pages/[game]/[[brand]]/[[category]].vue';
const GAMES = GAMES_LIST.join('|'); // -> "csgo|rust|tf2|dota2"

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
        name: 'catalog-game',
        path: `/:game(${GAMES})/:brand?/:category?`,
        file: CATALOG_FILE,
      },
      {
        name: 'catalog',
        path: '/:brand?/:category?',
        file: CATALOG_FILE,
      },
    );
  },
};
