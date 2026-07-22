import type { gameTypes } from '@/composables/useGames';
import type { ISkin } from '@/composables/useSkinItem';

export const addGameForSkin = (skin: ISkin, game: gameTypes): ISkin => {
  skin.game = game;
  return skin;
};

export const MARKETPLACE_SKIN_IMAGES_QUERY = {
  small: { 2500: 160, 1920: 165, 1440: 172, 1230: 116, 600: 200 },
  default: { 2500: 190, 1920: 187, 1440: 208, 1230: 209, 600: 200 },
  large: { 2500: 210, 1920: 215, 1440: 262, 1230: 282, 600: 200 },
};
