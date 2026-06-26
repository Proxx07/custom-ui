import type { TColors } from '@/utils';

export interface PopoverProps {
  width?: number | string
  gap?: number
  disabled?: boolean

  bg?: TColors
}

export interface PopoverSlots {
  target: (props: { open: () => void, close: () => void, toggle: () => void, isOpen: boolean }) => unknown
  default: (props: { close: () => void }) => unknown
}

export interface PopoverExposes {
  open: () => void
  close: () => void
  toggle: () => void
}
