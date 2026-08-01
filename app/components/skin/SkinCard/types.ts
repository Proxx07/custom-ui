import type { PhaseQueryTypes } from '@/composables/useItemFades';
import type { ExteriorTypes } from '@/composables/useSkinItem';

interface slotProps {
  skinName: string
  skinType?: string

  image: string
  imageFront?: string
  imageBack?: string

  price: number
  steamPrice: number

  phase: PhaseQueryTypes | ''
  exterior?: ExteriorTypes

  float: string
  floatPercent: number
  lowestPrice: number

  statTrack: boolean
  souvenir: boolean
  rarityColor?: string

  offersCount?: string
}

export interface SkinSlots {
  default: (props: slotProps) => unknown
}
