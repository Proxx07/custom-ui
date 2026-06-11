import type { TSizes } from '@/utils';

export type CheckboxValue = string | number;

export interface CheckboxProps<T extends CheckboxValue = CheckboxValue> {
  modelValue?: boolean | T[]
  label?: string
  loading?: boolean
  value?: T
  fluid?: boolean
  size?: Extract<TSizes, 's' | 'm'>
}

export interface CheckboxEmits<T extends CheckboxValue = CheckboxValue> {
  (e: 'update:modelValue', value: boolean | T[]): void
}

export interface CheckboxSlots {
  default: (props: { isHovered: boolean, updateOnlyCurrent: () => void, label: string }) => unknown
}
