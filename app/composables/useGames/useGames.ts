import type { gameTypes } from './types';

export const useGames = () => {
  const selectedGame = useCookie<gameTypes>('game', { default: () => 'csgo' });

  const setSelectedGame = (value: gameTypes) => {
    selectedGame.value = value;
  };

  return {
    selectedGame,
    setSelectedGame,
  };
};
