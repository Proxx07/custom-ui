import type { CatalogSkinItem, ISkin } from '@/composables/useSkinItem';

export interface SkinsListResponse {
  items: ISkin[]
  nextCursor: string
  success: boolean
}

export interface CatalogSkinListResponse {
  nextCursor: string
  items: CatalogSkinItem[]
  available_filters: string[]
  success: boolean
}
