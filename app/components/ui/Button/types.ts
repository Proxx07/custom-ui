import type { TColors, TSizes } from '@/utils';

type Severity = 'primary' | 'secondary' | 'tretiary' | 'destructive' | 'attention';

export interface ButtonProps {
  severity?: Severity
  hoverSeverity?: Severity
  size?: TSizes
  variant?: 'outlined' | 'text'

  type?: 'button' | 'nuxt-link'
  label?: string
  iconLeft?: string // svg icons from assets
  iconRight?: string // svg icons from assets

  bgColor?: TColors
  hoverBgColor?: TColors
  textColor?: TColors
  hoverTextColor?: TColors

  padding?: string
  noHoverBg?: boolean
  fluid?: boolean

  rotateLeftIcon?: boolean
  rotateRightIcon?: boolean
  leftIconNoFill?: boolean
  rightIconNoFill?: boolean
  loading?: boolean
}

export interface ButtonSlots {
  append: () => unknown
  default: () => unknown
  prepend: () => unknown
}
