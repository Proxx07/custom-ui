import type { PhaseQueryTypes } from '@/composables/useItemFades';
import type { ExteriorTypes } from '@/composables/useSkinItem';

interface slotProps {
  skinName: string
  skinType?: string

  image: string
  price: number
  steamPrice: number

  phase: PhaseQueryTypes | ''
  exterior?: ExteriorTypes
  float?: number

  statTrack: boolean
  souvenir: boolean
  rarityColor?: string

  offersCount?: string
  imageSlider?: [string, string, string]
}

export interface SkinSlots {
  default: (props: slotProps) => unknown
}
