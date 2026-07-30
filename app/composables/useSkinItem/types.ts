import type { CardSizeType } from '@/composables/UI';
import type { gameTypes } from '@/composables/useGames';
import type { SkinItemId } from '@/composables/useSkinsList';
import type { TColors } from '@/utils';

export type SkinPlaceholderTypes = 'ak47' | 'bayonet' | 'butterfly' | 'flipKnive' | 'glock' | 'gloves' | 'kerambit'
  | 'key' | 'm4a1s' | 'm4a4' | 'machineGun' | 'mp9' | 'shadowDaggers' | 'shotgun' | 'skeleton' | 'sniperRifels';

export type ExteriorTypes = 'FN' | 'MW' | 'FT' | 'WW' | 'BS';

export interface ISkinCardSticker {

}

export interface ISkin {
  id: SkinItemId
  game: gameTypes

  name: string // Полное название скина
  localized_name: string // Полное переведённое название скина

  type?: string
  float?: number
  rarityColor: string
  phase?: string
  exterior?: ExteriorTypes

  // Не обработанные изображения
  image: string
  imageFront?: string
  imageBack?: string
  imageScreenshot?: string

  // Не обработанные цены
  price: number
  steamPrice: number
  lowestPrice?: number
  averagePrice?: number
  suggestedPrice?: number

  auto?: boolean // Хуй знает почему так называется
  offersCount: number

  // stickers, gems
}

export interface SkinItemProps {
  item: ISkin
  cardSize?: CardSizeType

  background?: TColors
  hoverBackground?: TColors
}
