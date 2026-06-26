import type { gameTypes } from '../types';

export const GAMES_LIST: gameTypes[] = ['csgo', 'rust', 'tf2', 'dota2'];

export const GAMES_IMAGES: Record<gameTypes, string> = {
  csgo: '/images/games/m_csgo.webp',
  rust: '/images/games/m_rust.webp',
  tf2: '/images/games/m_tf2.webp',
  dota2: '/images/games/m_dota2.webp',
};

export const GAMES_LABELS: Record<gameTypes, string> = {
  csgo: 'CS2',
  rust: 'Rust',
  tf2: 'TF2',
  dota2: 'Dota 2',
};
