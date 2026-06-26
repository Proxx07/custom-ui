import type { gameTypes } from './types';

export const useGames = () => {
  const selectedGame = ref<gameTypes>('csgo');

  const setSelectedGame = (value: gameTypes) => {
    selectedGame.value = value;
  };

  return {
    selectedGame,
    setSelectedGame,
  };
};
