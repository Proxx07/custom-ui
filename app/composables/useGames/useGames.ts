import type { gameTypes, TGamePrefixForLink } from './types';
import { GAMES_LABELS } from './model';

export const useGames = () => {
  const $route = useRoute();

  const selectedGame = computed<gameTypes>(() => {
    const game: gameTypes = ($route.params.game && typeof $route.params.game === 'string' && GAMES_LABELS[$route.params.game as gameTypes])
      ? $route.params.game as gameTypes
      : 'csgo';
    return game;
  });

  const gamePrefixForLink = computed<TGamePrefixForLink>(() => {
    return selectedGame.value === 'csgo' ? '/' : `/${selectedGame.value}/`;
  });

  return {
    selectedGame,
    gamePrefixForLink,
  };
};
