import type { TSizes } from '@/utils';

export interface PhaseLabelProps {
  phase?: 'phase' | 'sapphire' | 'ruby' | 'pearl' | 'emerald'
  label?: string
  size?: Extract<TSizes, 'l' | 'm' | 's'>
}
