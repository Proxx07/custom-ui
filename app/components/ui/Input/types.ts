export interface InputProps {
  modelValue?: any
}

export interface InputSlots {
  prefix: () => unknown
  suffix: () => unknown
}

export interface InputEmits {
  (e: 'update:modelValue', val: any): void
}
