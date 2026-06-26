import type { PhaseQueryTypes } from '../types';
import type { TColors } from '@/utils';

export const PHASE_LIST: PhaseQueryTypes[] = ['p1', 'p2', 'p3', 'p4', 'sh', 'rb', 'bp', 'em'];

export const PHASE_COLORS_RECORD: Record<PhaseQueryTypes, TColors> = {
  p1: 'phase',
  p2: 'phase',
  p3: 'phase',
  p4: 'phase',
  sh: 'sapphire',
  rb: 'ruby',
  bp: 'pearl',
  em: 'emerald',
};
