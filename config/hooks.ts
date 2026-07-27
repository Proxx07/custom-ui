import type { NuxtPage } from '@nuxt/schema';
import { GAMES_LIST } from '../app/composables/useGames/model';
import { generateI18nModuleTypes } from './helpers/generateI18nModuleTypes';

const PREFIXED_GAMES = GAMES_LIST.filter(game => game !== 'csgo');
const GAME_PARAM = `:game(${PREFIXED_GAMES.join('|')})`;

export const hooks = {
  'prepare:types': function (option: any) {
    generateI18nModuleTypes();
    const paths = option.tsConfig.compilerOptions?.paths;
    if (!paths) return;
    delete paths['~'];
    delete paths['~/*'];
  },

  'pages:extend': function (pages: NuxtPage[]) {
    for (const page of pages) {
      if (!page.path.startsWith('/:game?/')) continue;
      page.path = `/${GAME_PARAM}?${page.path.slice('/:game?'.length)}`;
    }
  },
};
