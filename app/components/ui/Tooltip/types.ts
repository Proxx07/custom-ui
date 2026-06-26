import type { TColors } from '@/utils';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  text?: string
  position?: TooltipPosition
  background?: TColors
  color?: TColors
  maxWidth?: number // pixels
}

export interface TooltipSlots {
  default: () => unknown
  content: () => unknown
}
