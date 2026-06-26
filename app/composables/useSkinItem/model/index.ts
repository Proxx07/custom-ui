import type { ExteriorTypes } from '../types';

export const EXTERIORS_LIST: ExteriorTypes[] = ['FN', 'MW', 'FT', 'WW', 'BS'];

export const getExteriorFromName = (name: string): ExteriorTypes | '' => {
  if (!name) return '';
  if (/Factory New/i.test(name)) return 'FN';
  if (/Minimal Wear/i.test(name)) return 'MW';
  if (/Field-Tested/i.test(name)) return 'FT';
  if (/Well-Worn/i.test(name)) return 'WW';
  if (/Battle-Scarred/i.test(name)) return 'BS';
  return '';
};

export const EXTERIOR_FLOATS: Record<Exclude<ExteriorTypes, 'BS'>, number> = {
  FN: 0.07,
  MW: 0.15,
  FT: 0.37,
  WW: 0.44,
};

export const getExteriorFromFloat = (float?: number): ExteriorTypes | '' => {
  if (float === undefined || float === null || float < 0 || float > 1 || Number.isNaN(float)) return '';
  if (float < EXTERIOR_FLOATS.FN) return 'FN';
  if (float < EXTERIOR_FLOATS.MW) return 'MW';
  if (float < EXTERIOR_FLOATS.FT) return 'FT';
  if (float < EXTERIOR_FLOATS.WW) return 'WW';
  return 'BS';
};

export const getFloatPercent = (float?: number): number => {
  if (float === undefined || float === null || float < 0 || float > 1 || Number.isNaN(float)) return 0;
  return +(float * 100).toFixed(2);
};

const EXTERIOR_RANGES: ReadonlyArray<{ type: ExteriorTypes, min: number, max: number }> = [
  { type: 'FN', min: 0, max: EXTERIOR_FLOATS.FN },
  { type: 'MW', min: EXTERIOR_FLOATS.FN, max: EXTERIOR_FLOATS.MW },
  { type: 'FT', min: EXTERIOR_FLOATS.MW, max: EXTERIOR_FLOATS.FT },
  { type: 'WW', min: EXTERIOR_FLOATS.FT, max: EXTERIOR_FLOATS.WW },
  { type: 'BS', min: EXTERIOR_FLOATS.WW, max: 1 },
];

export const getExteriorListFromFloatRange = (minFloat?: number, maxFloat?: number): ExteriorTypes[] => {
  if (typeof minFloat !== 'number' || typeof maxFloat !== 'number' || minFloat < 0 || maxFloat > 1 || minFloat > maxFloat) return [];

  return EXTERIOR_RANGES
    .filter(({ min, max }) => minFloat < max && maxFloat >= min)
    .map(({ type }) => type);
};
