import type { CardSizeType } from '@/composables/UI';
import type { gameTypes } from '@/composables/useGames';

type SkinImageBreakpointMap = Record<number, number>;

export interface SkinImageProps {
  image: string
  game: gameTypes
  cardSize?: CardSizeType
  imageQuery?: Record<CardSizeType, SkinImageBreakpointMap>
  imageWidth?: number // fallback width

  rarityImage?: 'hex' | 'shadow'
  rarityColor?: string
}
