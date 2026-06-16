import type { TColors } from '@/utils';

export interface InputRangeProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  color?: TColors
  disabled?: boolean
  showValue?: boolean
}
