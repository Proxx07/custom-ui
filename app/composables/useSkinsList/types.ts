import type { ISkin } from '@/composables/useSkinItem';

export interface SkinsListResponse {
  hasMore: boolean
  items: ISkin[]
  nextCursor: string
  success: boolean
}
