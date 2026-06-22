import type { TColors } from '@/utils';

export type ButtonValue<T, V extends keyof T> = [V] extends [never] ? T : T[V];

export interface ButtonGroupProps<T, V extends keyof T = never> {
  modelValue?: ButtonValue<T, V>
  items?: T[]
  value?: V
  itemLabel?: keyof T
  loading?: boolean

  groupBg?: TColors

  color?: TColors
  hoverColor?: TColors
  activeColor?: TColors

  bg?: TColors
  hoverBg?: TColors
  activeBg?: TColors
}

export interface ButtonGroupEmits<T, V extends keyof T = never> {
  (e: 'update:modelValue', val: ButtonValue<T, V>): void
}

export interface ButtonGroupSlots<T> {
  itemInner: (props: { item: T, isSelected: boolean }) => unknown
}
