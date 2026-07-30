import type { gameTypes } from '@/composables/useGames';
import type { ExteriorTypes } from '@/composables/useSkinItem';

export type SkinItemId = string;

export interface ISteamPrice {
  market_name: string
  item_id?: SkinItemId
  average: number
  current?: number
  popular: boolean
  lowest_price?: number
  type?: string
  tag_type?: string
  rarity_color?: string
  rarity?: string
  ru_name?: string
  ch_name?: string
  localized_name?: string
}

export interface StickerSteamPrice {
  average: number
  img: string
  type: string
  localized_name?: string
}

export interface Sticker {
  id: SkinItemId
  sticker_id: number
  wear?: number
  name: string
  image: string
  slot: number
  steam_price: StickerSteamPrice
}

export interface InspectItem {
  origin?: number
  floatvalue: number
  imageurl?: string
  weapon_type?: string
  front?: string
  back?: string
  full_screenshot?: string
  stickers: Sticker[]
}

export interface IGem {
  name: string
  type: string
  img: string
  color?: string
}

export interface SkinListItem {
  item_id: SkinItemId
  game: gameTypes
  name: string
  market_name: string
  image: string
  brand?: string
  category?: string
  exterior?: ExteriorTypes
  full_ex?: string
  tag?: string
  price: number
  auto: boolean
  stat_trak: boolean
  steam_price: ISteamPrice
  offer_count: number

  // present only on some items
  blue_percent?: number
  fade_percent?: number
  float?: number
  phase?: string
  inspect_item?: InspectItem
  thumb_image?: string
  twit_image?: string
  gems?: IGem[]
}

export interface CatalogSkinItem {
  item_id: SkinItemId

  image: string
  inspect_images?: {
    back: string
    front: string
  }
  game?: gameTypes
  localized_name: string
  market_name: string
  max_price: number
  min_price: number
  offer_count: number
  phase: string
  rarity: string
  rarity_color: string
  skin_name: string
  stickers: Sticker[]
}

export interface SkinsListResponse {
  items: SkinListItem[]
  nextCursor: string
  success: boolean
}

export interface CatalogSkinListResponse {
  nextCursor: string
  items: CatalogSkinItem[]
  available_filters: string[]
  success: boolean
}
